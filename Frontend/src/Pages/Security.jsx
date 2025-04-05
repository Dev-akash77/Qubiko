import React from "react";
import Header_p from "./../UI/Header_p";
import { useStore } from "../Context/Store";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutgoingMail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Security = () => {
  const { profileData } = useStore();
  const { name, email, number } = profileData?.profile || {};
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden cc w-full">
          <div className="container h-full">
            <Header_p text="Security" logo={false} />

            <div className="flex flex-col gap-5 mt-5">
              {/* name sectrion */}
              <div className="flex flex-col gap-1 cursor-pointer">
                <p className="text-xl font-medium">Name</p>
                <div className="bg-gray-50 flex items-center justify-between border border-gray-200 py-3 rounded-md px-2">
                  <p className="text-xl">{name}</p>
                  <HiOutlineUser className="text-2xl text-gray-300" />
                </div>
              </div>

              {/* email sectrion */}
              <div className="flex flex-col gap-1 cursor-pointer">
                <p className="text-xl font-medium">Email</p>
                <div className="bg-gray-50 flex items-center justify-between border border-gray-200 py-3 rounded-md px-2">
                  <p className="text-xl">{email}</p>
                  <MdOutgoingMail className="text-2xl text-gray-300" />
                </div>
              </div>

              {/* number sectrion */}
              <div className="flex flex-col gap-1 cursor-pointer">
                <p className="text-xl font-medium">Number</p>
                <div className="bg-gray-50 flex items-center justify-between border border-gray-200 py-3 rounded-md px-2">
                  <p className="text-xl">{number}</p>
                  <FaPhoneVolume className="text-xl text-gray-300" />
                </div>
              </div>

              {/* change password button body */}

              <Link to={'/changePassword'}
                className="rounded-md cc w-full bg-blue text-white hover:bg-blue-400 duration-500 py-3 outline-0 border-0 cursor-pointer"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
