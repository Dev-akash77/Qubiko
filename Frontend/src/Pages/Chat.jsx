import React, { useEffect } from "react";
import { useStore } from "../Context/Store";
import Header from "../Components/Header";
import InputChat from "../Components/InputChat";
import ChatContent from "../Components/ChatContent";
import StartChat from "../Components/StartChat";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../Context/Socket";

const Chat = () => {
  const { setheading, heading, chatID } = useStore();
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { socket,setMessage,handleQuery } = useSocket();

  useEffect(() => {
    if (chatId !== "start" && socket) {
      socket.emit("fetchHistory", chatId);
  
      const handleHistory = (history) => {
        setMessage(history);
      };
  
      const handleError = (error) => {
        toast.error(error);
      };
  
      socket.on("history", handleHistory);
      socket.on("error", handleError);
  
      return () => {
        socket.off("history", handleHistory);
        socket.off("error", handleError);
      };
    }
  }, [chatId, socket]);
  
 
  useEffect(() => {
    if (chatId == "start") {
      navigate(`/chat/${chatID}`);
    }
  }, [chatID, navigate]);

  useEffect(() => {
    setheading({ name: "Qubiko AI", logo: false });
  }, [setheading]);

  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen cc">
        <div className="h-full w-full flex flex-col justify-between border md:rounded-sm">
          <Header text={heading.name} icon={heading.logo} />
          <div className="h-full overflow-auto">
            {chatId === "start" ? <StartChat /> : <ChatContent />}
          </div>
          <InputChat chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
