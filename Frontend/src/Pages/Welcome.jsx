import React from "react";
import logo from "../assets/Group 8.svg";
const Welcome = () => {
  return (
    <div className="h-full overflow-hidden cc">
      <div className="container cc text-center gap-[2rem]">
        <img src={logo} alt="logo" className="w-[7.5rem]" />
        <p className="text-[2.1rem] font-semibold leading-[3rem]">
          Welcome to <br />
          Qubiko AI 👋
        </p>
        <p className="text-gray-600 ">
          Start chatting with Qubiko AI now. <br /> You can ask me anything.
        </p>

        <button className="w-full py-3 cc bg-blue rounded-full text-white capitalize text-md cursor-pointer">
          start Chat
        </button>
      </div>
    </div>
  );
};

export default Welcome;
