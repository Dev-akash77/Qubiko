import React, { useEffect } from "react";
import { useStore } from "../Context/Store";
import { IoChevronForwardSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import { MdLanguage } from "react-icons/md";
import { TbDeviceUnknown } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import proimage from "../assets/pro.svg";
import { Link } from "react-router-dom";
const Account = () => {
  const { setheading, profileData } = useStore();

  useEffect(() => {
    setheading({ name: "Qubiko AI", logo: true });
  }, [setheading]);

  //  ! profile data
  const { name, email, image, phone, gender } = profileData?.profile || {};

  return (
    <div className="h-full overflow-hidden cc">
      <div className="container h-full">
        {/* profile_pic*/}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center justify-center gap-3">
            <img
              src={image}
              alt={name}
              className="w-[5rem] rounded-full overflow-hidden"
            />
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-sm">{email}</p>
            </div>
          </div>
          <div>
            <IoChevronForwardSharp className="text-2xl" />
          </div>
        </div>
        {/* Account pro mode */}
        <img src={proimage} alt="pro image" className="w-full" />

        {/* general */}
        <div className="flex items-center justify-center gap-2 text-gray-500">
          General
          <span className="w-full h-[0.04rem] bg-gray-300 rounded-md"></span>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 mt-5">
          <Link
            to={"/personal"}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center justify-center gap-2">
              <HiOutlineUser className="text-xl" />
              <p className="font-semibold">Personal Info</p>
            </div>
            <IoChevronForwardSharp className="text-2xl" />
          </Link>
          <Link
            to={"/security"}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center justify-center gap-2">
              <IoShieldCheckmarkOutline className="text-xl" />
              <p className="font-semibold">Security</p>
            </div>
            <IoChevronForwardSharp className="text-2xl" />
          </Link>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <MdLanguage className="text-xl" />
              <p className="font-semibold">Language</p>
            </div>
            <p className="mr-2">English</p>
          </div>
        </div>

        {/* About */}
        <div className="flex items-center justify-center gap-2 mt-5 text-gray-500">
          About
          <span className="w-full h-[0.04rem] bg-gray-300 rounded-md"></span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 mt-5">
          <Link
            to={"/contact"}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center justify-center gap-2">
              <MdContactPage className="text-xl" />
              <p className="font-semibold">Contact us</p>
            </div>
            <IoChevronForwardSharp className="text-2xl" />
          </Link>
          <Link
            to={"/about"}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center justify-center gap-2">
              <TbDeviceUnknown className="text-xl" />
              <p className="font-semibold">About</p>
            </div>
            <IoChevronForwardSharp className="text-2xl" />
          </Link>
        </div>

        {/* log out */}
        <div className="flex items-center justify-start text-red-500 mt-5 gap-2 text-[1.3rem]">
          <IoIosLogOut className="text-2xl"/> Logout
        </div>
      </div>
    </div>
  );
};

export default Account;
