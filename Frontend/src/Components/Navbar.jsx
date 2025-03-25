import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center text-highlightText text-xl ${
      isActive ? "main_active" : ""
    }`;

  return (
    <div className="flex w-full h-[5rem] cc bg-gray-50">
      <div className="container flex items-center justify-between px-2">
        <NavLink className={navLinkClass} to={"/"}>
          <IoChatbubbleEllipsesOutline />
          <p className="text-[.8rem]"> Chat</p>
        </NavLink>

        <NavLink className={navLinkClass} to={"assistent"}>
          <BiCategory />
          <p className="text-[.8rem]"> AI Assistants</p>
        </NavLink>

        <NavLink className={navLinkClass} to={"history"}>
          <MdHistory />
          <p className="text-[.8rem]"> History</p>
        </NavLink>

        <NavLink className={navLinkClass} to={"account"}>
          <FaRegUser className="font-semibold" />
          <p className="text-[.8rem]">Account</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
