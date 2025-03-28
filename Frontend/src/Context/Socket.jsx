import { createContext, useContext, useEffect, useState } from "react";
import { useStore } from "./Store";
import io from "socket.io-client";

const socketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { profileData ,chatID, setChatID } = useStore();
  
  const [message, setMessage] = useState([]);


  const handleQuery = async (e) => {
    e.preventDefault();
    if (!socket) return;
    const formData = new FormData(e.target);
    const query = formData.get("query");
    setMessage((prev) => [...prev, { question: query, answer: "Loading..." }]);
    socket.emit("query", query);

    if (chatID === "start") {
      setChatID("67e584ae7f8e8d5e81a00ca3")
    }
  };

  useEffect(() => {
    if (profileData) {
      const Socket = io(import.meta.env.VITE_BACKEND_URL, {
        query: {
          userId: profileData?.profile?._id,
        },
      });

      Socket.on("response", ({ query, response }) => {
        setMessage((prev) => {
          return prev.map((msg) => {
            return msg.question === query ? { ...msg, answer: response } : msg;
          });
        });
      });

      setSocket(Socket);

      return () => {
        Socket.off("response");
        Socket.disconnect();
      };
    }
  }, [profileData]);
 
  return (
    <socketContext.Provider value={{ socket, setSocket, handleQuery,message }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
