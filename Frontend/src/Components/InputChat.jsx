import React from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useSocket } from "../Context/Socket";

const InputChat = ({ chatId }) => {
  const { handleQuery, query, setQuery } = useSocket();
  return (
    <div className="cc h-[7rem]">
      <form
        className="flex justify-between items-center md:borde w-[85%]"
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
          className="bg-gray-100 rounded-lg text-lg p-3 w-[82%] border-0 outline-none"
        />
        <button
          type="submit"
          className="rounded-full w-[2.8rem] h-[2.8rem] cc text-white bg-blue cursor-pointer"
        >
          <BsFillSendFill className="text-[1.3rem]" />
        </button>
      </form>
    </div>
  );
};

export default InputChat;
