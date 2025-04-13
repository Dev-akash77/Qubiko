import React, { useEffect } from "react";
import logo from "../assets/Group 8.svg";
import {useNavigate } from "react-router-dom";
import { useStore } from "../Context/Store";
import { useSocket } from "../Context/Socket";
const Welcome = () => {
  const { setheading,setChatID } = useStore();
  const { setMessage } = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    setheading({ name: "Qubiko AI", logo: true });
  }, [setheading]);
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

        <button
          className="w-[90%] py-3 cc bg-blue rounded-full text-white capitalize text-md cursor-pointer"
          onClick={() => {
            setMessage([]);
            setChatID("")
            navigate("/chat")
          }}
        >
          start Chat
        </button>
      </div>
    </div>
  );
};

export default Welcome;
