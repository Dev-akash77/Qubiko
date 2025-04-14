import React from "react";
import { IoSend } from "react-icons/io5";
import { useSocket } from "../Context/Socket";
import { FaMicrophone } from "react-icons/fa";
const InputChat = ({ chatId }) => {
  const { handleQuery, query, setQuery,handleMicrophone } = useSocket();
  return (
    <div className="cc h-[7rem]">
      <form
        className="flex justify-between items-center rounded-lg bg-gray-100 p-3"
        onSubmit={(e) => {
          handleQuery(e, chatId);
        }}
      >
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          required
          type="text"
          name="query"
          placeholder="Ask me anything..."
          className="rounded-lg text-lg border-0 outline-none w-full"
        />
        <div className="flex items-center justify-center gap-3">
          {/* ! microphone */}
          <div className="cursor-pointer" onClick={()=>{handleMicrophone()}}>
            <FaMicrophone className="text-[1.2rem]" />
          </div>
          {/* !send button */}
          <button type="submit" className=" cursor-pointer">
            <IoSend className="text-[1.2rem]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputChat;
