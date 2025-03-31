import React, { useEffect, useRef } from "react";
import logo from "../assets/Group 8.svg";
import { IoChevronBackOutline, IoHeartDislikeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useStore } from "../Context/Store";
import { toast } from "react-toastify";
import { deleteAllHistory } from "../Api/Api";


const Header = ({ icon, text, search }) => {
  const navigate = useNavigate();
  const { isSearchOpen, setIsSearchOpen, searchInput, setsearchInput, token ,historyRefetch} =
    useStore();
  const searchInputRef = useRef(null);
  //! Automatically focus on the input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (isSearchOpen) {
    return (
      <div className="h-[6rem] cc z-50">
        <div className={`container flex items-center justify-start gap-[1rem]`}>
          <IoChevronBackOutline
            className="text-3xl cursor-pointer"
            onClick={() => {
              setIsSearchOpen(false);
            }}
          />
          <div className="w-full bg-gray-100 rounded-md flex p-3 gap-3">
            <IoSearch className="cursor-pointer text-[1.3rem] font-bold" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchInput}
              onChange={(e) => {
                setsearchInput(e.target.value);
              }}
              className="border-none outline-none w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }


  // ! delete all user history
  const handleDeleteAllHistory = async () => {
    const data = await deleteAllHistory(token);
    if (data?.success) {
      toast.success(data?.message);
      historyRefetch();
    }
  };


  return (
    <div className="h-[6rem] cc z-50">
      <div
        className={`container flex items-center ${
          search ? "justify-between" : "justify-start"
        } gap-[4rem]`}
      >
        {icon ? (
          <img src={logo} alt="logo" className="w-[2.3rem] ml-2" />
        ) : (
          <IoChevronBackOutline
            className="text-3xl cursor-pointer"
            onClick={() => {
              navigate(-1);
              historyRefetch();
            }}
          />
        )}
        <p className="text-2xl font-semibold">{text}</p>
        {search && (
          <div className="flex item-center justify-center gap-2 pr-2">
            <IoSearch
              className="cursor-pointer text-2xl font-bold"
              onClick={() => {
                setIsSearchOpen(true);
              }}
            />
            <MdDeleteOutline
              className="cursor-pointer text-2xl font-bold"
              onClick={handleDeleteAllHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
