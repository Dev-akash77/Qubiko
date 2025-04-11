import React, { useState } from "react";
import { useStore } from "../Context/Store";
import Small_Loader from './../UI/Small_Loader';

const DeleteNotificaton = ({ content, heading, action, onConfirm }) => {
  const { setisOpenDeleteMessage } = useStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (typeof onConfirm === "function") {
        await onConfirm();
      }
    } finally {
      setLoading(false);
      setisOpenDeleteMessage(false);
    }
  };

  return (
    <div className="cc w-full h-full">
      <div className="w-[90%] h-full">
        <div className="cc mt-6 mb-4 text-xl text-red-500">{heading}</div>
        <hr className="text-gray-400 rounded-2xl" />
        <p className="py-5 cc text-xl font-semibold">{content}</p>
        <div className="flex items-center justify-between gap-3">
          <button
            className="bg-[#E0E7F2] w-[50%] h-[3.5rem] text-blue text-lg rounded-full cursor-pointer"
            onClick={() => {
              setisOpenDeleteMessage(false);
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-blue w-[50%] h-[3.5rem] text-white text-lg rounded-full cursor-pointer flex items-center justify-center"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? <Small_Loader /> : `Yes, ${action}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotificaton;
