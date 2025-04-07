import React from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoChevronBackOutline } from 'react-icons/io5';

const Header_p = ({text,logo}) => {
    const navigate = useNavigate();
  return (
    <div className={`flex items-center h-[5rem] relative z-50`}>
      <IoChevronBackOutline
        className="text-3xl cursor-pointer z-50 absolute"
        onClick={() => {
            navigate(-1);
        }}
      />
      <p className="text-[1.35rem] cc font-semibold w-full absolute">{text}</p>
      {logo&&<RiEdit2Line className="text-2xl absolute right-3"/>}
    </div>
  );
};

export default Header_p;
