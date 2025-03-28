import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useSocket } from "../Context/Socket";
import Prism from "prismjs";
const ChatContent = () => {

  const { message } = useSocket();
  useEffect(()=>{
    Prism.highlightAll();
  },[message]);

  return (
    <div className="h-full cc w-full mt-5">
      <div className="container h-full w-full flex flex-col gap-5">
        {message?.map((cur, id) => {
          return (
            <div key={id} className="flex flex-col gap-5">
              <div className="ai flex justify-end">
                <div className="bg-gray-100 text-black w-max py-2 rounded-xl px-5">
                  {cur.question}
                </div>
              </div>

              <div className="user flex justify-center">
                <div className="w-full py-4 px-1 text-black">
                  <ReactMarkdown>{cur.answer}</ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatContent;
