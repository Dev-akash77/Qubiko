import { Server } from "socket.io";
import http from "http";
import express from "express";
import { askQubiko } from "./Services/Langchain.service.js";
import "dotenv/config";
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
  socket.on("query", async (query) => {
    const response = await askQubiko(query);
    io.to(users[userId]).emit("response", { query, response });
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
 
