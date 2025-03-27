import React from "react";
import logo from "../assets/Group 8.png";
const StartChat = () => {
  const capability = [
    "Conversational AI <br/> (Chat with me like a real human, anytime!)",
    "Smart Image Generation <br/> (Create high-quality images from your text)",
    "Real-time Weather Updates <br/> (Get accurate weather info for any city)",
  ];

  return (
    <div className="cc w-full h-full">
      <div className="container h-full">
        <div className="cc mt-8">
          <img src={logo} alt="strat logo" className="w-[4rem]" />
        </div>
        <p className="text-gray-400 cc text-xl mt-3">Capabilities</p>
        <div className="mt-5 flex flex-col gap-7 w-full cc">
          {capability.map((cur, id) => (
            <div
              className="bg-gray-100 text-gray-400 w-[90%] py-3 px-4 rounded-md text-center text-[.8rem]"
              key={id}
              dangerouslySetInnerHTML={{ __html: cur }}
            />
          ))}
        </div>
        <p className="text-[.8rem] cc mt-3 text-gray-400">
          These are just a few examples of what I can do.
        </p>
      </div>
    </div>
  );
};

export default StartChat;
