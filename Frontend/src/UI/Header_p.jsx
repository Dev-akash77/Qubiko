import React from "react";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoChevronBackOutline } from 'react-icons/io5';

const Header_p = ({text,logo}) => {
    const navigate = useNavigate();
  return (
    <div className={`flex items-center gap-[4rem] h-[5rem]`}>
      <IoChevronBackOutline
        className="text-3xl cursor-pointer"
        onClick={() => {
            navigate(-1);
        }}
      />
      <p className="text-[1.35rem] font-medium ">{text}</p>
      {logo&&<RiEdit2Line className="text-2xl"/>}
    </div>
  );
};

export default Header_p;
