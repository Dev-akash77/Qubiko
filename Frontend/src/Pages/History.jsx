import React, { useEffect, useState, useRef } from "react";
import { useStore } from "../Context/Store";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MainLoader from "../UI/MainLoader";
import { toast } from "react-toastify";
import { deleteHistory } from "../Api/Api";

const History = () => {
  const { setheading, historyData, historyLoading,token,historyRefetch } = useStore();
  const [showDeleteIndex, setShowDeleteIndex] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    setheading({
      name: "History",
      logo: false,
      search: true,
    });
  }, [setheading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDeleteIndex !== null &&
        menuRefs.current[showDeleteIndex] &&
        !menuRefs.current[showDeleteIndex].contains(event.target)
      ) {
        setShowDeleteIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDeleteIndex]);

  const handleDeleteToggle = (index) => {
    setShowDeleteIndex((prev) => (prev === index ? null : index));
  };

  // ! loading state
  if (historyLoading) {
    return (
      <div className="h-screen w-screen cc bg-black">
        <MainLoader />
      </div>
    );
  }

  // ! delete history
  const handleDeleteHistory = async(chatId)=>{
    const data =  await deleteHistory(token,chatId);  
    if (data?.success) {
      toast.success(data?.message);
      historyRefetch();
    }      
    setShowDeleteIndex(null);
  }
  return (
    <div className="cc w-full">
      <div className="container w-full">
        <div className="cc gap-5 mt-5">
          {historyData?.history?.map((cur, id) => {
            return (
              <div
                key={cur._id}
                className="bg-gray-100 rounded-md p-3 w-full flex items-center justify-between cursor-pointer relative hover:bg-gray-200 transition"
              >
                <div className="flex flex-col gap-2" onClick={() => navigate(`/chat/${cur._id}`)}>
                  <p className="text-[1.05rem]">
                    {cur.heading.replace(/\*\*/g, "").length > 20
                      ? cur.heading.replace(/\*\*/g, "").slice(0, 20) + "..."
                      : cur.heading.replace(/\*\*/g, "")}
                  </p>
                  <p className="text-[.8rem] flex items-center gap-2">
                    {new Date(cur.updatedAt).toLocaleString()}
                  </p>
                </div>

                <div
                  className="relative"
                  ref={(el) => (menuRefs.current[id] = el)}
                >
                  <BsThreeDotsVertical
                    className="cursor-pointer"
                    onClick={() => handleDeleteToggle(id)}
                  />

                  {showDeleteIndex === id && (
                    <div
                      className="absolute bg-black text-white rounded-md px-2 py-1 right-0 top-6 shadow-md cursor-pointer"
                      onClick={() => {
                        handleDeleteHistory(cur)
                      }}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
