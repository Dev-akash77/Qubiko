import React from "react";
import logo from "../assets/Group 8.svg";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header = ({ icon, text }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[5rem] cc z-50">
      <div className="container flex items-center justify-start gap-[4rem]">
        {icon ? (
          <img src={logo} alt="logo" className="w-[1.8rem] ml-2" />
        ) : (
          <IoChevronBackOutline
            className="text-3xl cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        <p className="text-2xl font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Header;
