import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "./Store";
import io from "socket.io-client";
import { toast } from "react-toastify";

const socketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { profileData, chatID, setChatID } = useStore();
  const [message, setMessage] = useState([]);

  const handleQuery = async (e,chatId) => {
    e.preventDefault();
    if (!socket) return;
    const formData = new FormData(e.target);
    const query = formData.get("query");

    setMessage((prev) => [...prev, { question: query, answer: "Loading..." }]);
    socket.emit("query", {query,chatID:chatId});
  };

  useEffect(() => {
    if (profileData && profileData.profile?._id) {
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        transports: ["websocket"], 
        withCredentials: true,
        query: { userId: profileData?.profile?._id },
      });

      newSocket.on("connect", () => {
        console.log("✅ Connected to WebSocket:", newSocket.id);
      });

      newSocket.on("response", ({ query, response,chatId}) => {
        setMessage((prev) => {
          return prev.map((msg) => (msg.question === query ? { ...msg, answer: response } : msg));
        });

        if (chatID === "start" && chatID) {
          setChatID(chatId);
        }
      });

      // ! for error handling
      newSocket.on("error",(error)=>{
        toast.error(error)
      })

      newSocket.on("disconnect", () => {
        console.log("❌ WebSocket Disconnected!");
      });   
      setSocket(newSocket);

      return () => {
        newSocket.off("response");
        newSocket.disconnect();
      };
    }
  }, [profileData]);

  return (
    <socketContext.Provider value={{ socket, setSocket, handleQuery, message }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
