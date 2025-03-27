import React from "react";

const ChatContent = () => {
  return (
    <div className="h-full cc w-full mt-5">
      <div className="container h-full w-full flex flex-col gap-5">
        {[1, 2,3,4].map((cur, id) => {
          return (
            <div key={id} className="flex flex-col gap-5">
              <div className="ai flex justify-end">
                <div className="bg-highlightText text-white w-[85%] py-4 px-5 rounded-2xl rounded-br-[.3rem]">
                  Hello There
                </div>
              </div>

              <div className="user flex justify-start">
                <div className="bg-gray-100 w-[85%] py-4 px-5 rounded-2xl rounded-tl-[.3rem] text-black">
                  Hello! How may I assist you today? assist you today?
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
