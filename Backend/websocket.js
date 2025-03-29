import { Server } from "socket.io";
import http from "http";
import express from "express";
import { askQubiko } from "./Services/Langchain.service.js";
import "dotenv/config";
import { userModel } from "./Models/user.model.js";
import { chatModel } from "./Models/chat.model.js";
export const app = express();

export const server = http.createServer(app); //! creat socket server using express server : app

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://qubiko.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 
let users = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    users[userId] = socket.id;
    console.log("new client", users);
  }
 
  // ! if user given a task
  socket.on("query", async ({ query, chatID }) => {
    
    // !ensure query are not empty
    if (!query || !query.trim()) {
      socket.emit("error", "Question required");
      return;
    }
  
    // ! find user from user id
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        socket.emit("error", "User Not found");
        return false;
      }
      // !generate a short heading for chatModel
      const heading = await askQubiko(
        `Generate a short heading for: ${query}.`
      );

      // ! updated id
      let updatedChatId = chatID;

      const userMessage = {
        question: query,
        answer: "Loading...",
        createdAt: Date.now(),
      };

      // ! creat new chat
      if (chatID === "start") {
        const newChat = new chatModel({
          userId,
          heading,
          message: [userMessage],
        });
        const saveChat = await newChat.save();
        updatedChatId = saveChat._id;
      } else {
        
        // !current chat
        const currentChat = await chatModel.findById(chatID);
        // ! if current chat is wrong throw an error
        if (!currentChat) {
          socket.emit("error", "Current chat not found");
          return false;
        }
        // !if current chat is available
        currentChat.message.push(userMessage);
        await currentChat.save();
      }
  
      // ! response get from LLM
      const response = await askQubiko(query,updatedChatId);
   
      // !sending rsponse to the frontend
      
      // ! updatig user quistion answer;
      
      await chatModel.findByIdAndUpdate(
        updatedChatId,
        {
          $set: { "message.$[elem].answer": response },
        },
        {
          arrayFilters: [{ "elem.question": query }],
          new: true,
        }
      );

      if (users[userId]) {
        io.to(users[userId]).emit("response", { query, response,chatId: updatedChatId});
      }
     
    } catch (error) {
      console.error("Error fetching response:", error);
      socket.emit("error", "Something went wrong. Please try again.");
    }
  });
   
 

  socket.on("fetchHistory", async (id) => {
    if (!id) return;
  
    try {
      const currentChat = await chatModel.findById(id);
      if (!currentChat) {
        socket.emit("error", "Chat history not found");
        return;
      }
  
      socket.emit("history", currentChat.message); // Send chat history to frontend
    } catch (error) {
      console.error("Error fetching chat history:", error);
      socket.emit("error", "Failed to fetch history");
    }
  });
  

  

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const key in users) {
      if (users[key] === socket.id) {
        delete users[key];
        break;
      }
    }
  });
});
