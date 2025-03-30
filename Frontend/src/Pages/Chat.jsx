import React, { useEffect } from "react";
import { useStore } from "../Context/Store";
import Header from "../Components/Header";
import InputChat from "../Components/InputChat";
import ChatContent from "../Components/ChatContent";
import { useParams } from "react-router-dom";
import { useSocket } from "../Context/Socket";
import { toast } from "react-toastify";

const Chat = () => {
  const { setheading, heading } = useStore();
  const { chatId } = useParams();
  const { socket,setMessage } = useSocket();

  // ! set history massage fetch into data base

  useEffect(() => {
    if (chatId && socket) {
      socket.emit("fetchHistory", chatId);
  
      const handleHistory = (history) => {
        setMessage(history);
      };
  
      socket.on("history", handleHistory);
  
      return () => {
        socket.off("history", handleHistory);
      };
    }
  }, [chatId, socket]);
  
 

  useEffect(() => {
    setheading({ name: "Qubiko AI", logo: false });
  }, [setheading]);

  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen cc">
        <div className="h-full w-full flex flex-col justify-between border md:rounded-sm">
          <Header text={heading.name} icon={heading.logo} />
          <div className="h-full overflow-auto">
            <ChatContent />
          </div>
          <InputChat chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
