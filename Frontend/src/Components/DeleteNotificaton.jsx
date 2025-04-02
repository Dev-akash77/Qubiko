import React from "react";
import { useStore } from "../Context/Store";

const DeleteNotificaton = ({ content, heading, action }) => {
  const { setisOpenDeleteMessage } = useStore();
  return (
    <div className="cc w-full h-full">
      <div className="w-[90%] h-full">
        <div className="cc mt-6 mb-4 text-xl text-red-500">{heading}</div>
        <hr className="text-gray-400 rounded-2xl" />
        <p className="py-5 cc text-xl font-semibold">{content}</p>
        <div className="flex items-center justify-between gap-3">
          <button className="bg-[#E0E7F2] w-[50%] h-[3.5rem] text-blue text-lg rounded-full" onClick={()=>{setisOpenDeleteMessage(false)}}>
            Cancle
          </button>
          <button className="bg-blue w-[50%] h-[3.5rem] text-white text-lg rounded-full">
            Yes, {action == "logout" ? "logout" : "delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotificaton;
