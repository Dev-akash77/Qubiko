import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useStore } from "../Context/Store";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center text-highlightText text-xl ${
      isActive ? "main_active" : ""
    }`;
  const { historyRefetch, setIsSearchOpen } = useStore();
  return (
    <div className="flex w-full h-[5rem] cc">
      <div className="container flex items-center justify-between px-2">
        <NavLink
          className={navLinkClass}
          to={"/"}
          onClick={() => {
            setIsSearchOpen(false);
          }}
        >
          <IoChatbubbleEllipsesOutline />
          <p className="text-[.8rem]"> Chat</p>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={"assistent"}
          onClick={() => {
            setIsSearchOpen(false);
          }}
        >
          <BiCategory />
          <p className="text-[.8rem]"> AI Assistants</p>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={"history"}
          onClick={() => {
            setIsSearchOpen(false);
            historyRefetch();
          }}
        >
          <MdHistory />
          <p className="text-[.8rem]"> History</p>
        </NavLink>

        <NavLink
          className={navLinkClass}
          to={"account"}
          onClick={() => {
            setIsSearchOpen(false);
          }}
        >
          <FaRegUser className="font-semibold" />
          <p className="text-[.8rem]">Account</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
