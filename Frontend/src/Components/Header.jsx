import React from "react";
import logo from "../assets/Group 8.svg";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const Header = ({ icon, text,search }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[6rem] cc z-50">
      <div className={`container flex items-center ${search?"justify-between":"justify-start"} gap-[4rem]`}>
        {icon ? (
          <img src={logo} alt="logo" className="w-[2.3rem] ml-2" />
        ) : (
          <IoChevronBackOutline
            className="text-3xl cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        <p className="text-2xl font-semibold">{text}</p>
        {search && <div className="flex item-center justify-center gap-1">
          <IoSearch className="cursor-pointer text-2xl font-bold"/>
          <MdDeleteOutline className="cursor-pointer text-2xl font-bold"/>
          </div>}
      </div>
    </div>
  );
};

export default Header;
