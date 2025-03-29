import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useSocket } from "../Context/Socket";
import Prism from "prismjs";
import ChatLoading from "../UI/ChatLoading";

const ChatContent = () => {

  const { message } = useSocket();
  const chatEndRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="h-full cc w-full mt-5">
      <div className="container h-full w-full flex flex-col gap-5">
        {message?.map((cur, id) => {
          return (
            <div key={id} className="flex flex-col gap-5">
              <div className="ai flex justify-end">
                <div className="bg-gray-100 text-black py-2 rounded-xl px-5">
                  {cur.question}
                </div>
              </div>

              <div className="user flex justify-center">
                <div className="w-full py-4 px-1 text-black">
                  {cur.answer === "Loading..." ? (
                    <ChatLoading />
                  ) : (
                    <ReactMarkdown>{cur.answer}</ReactMarkdown>
                  )}

                </div>
              </div>
            </div>
          );
        })}
         <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default ChatContent;
