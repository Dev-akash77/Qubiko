import React from "react";
import logo from "../assets/Group 8.svg";
const Header = ({ icon,text }) => {
  return (
    <div className="h-[5rem] cc">
      <div className="container flex items-center justify-start gap-[4rem]">
        {icon ==="logo"? <img src={logo} alt="logo" className="w-[1.8rem]" /> : "Back"}
        <p className="text-2xl font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default Header;
