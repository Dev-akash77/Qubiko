import React, { useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useStore } from "../Context/Store";

const Authentication = () => {
  // ! all context
  const { islogin, setislogin } = useStore();

  const [isShow, setIsShow] = useState(false);

  const field = ["name", "email", "password"];

  return (
    <div className="h-screen w-screen cc">
      <div className="mobile_Screen cc">
        <div className="h-full w-full flex flex-col md:border cc">
          <div className="w-[90%] h-full">
            <div className="cursor-pointer w-max mt-5">
              <IoChevronBackOutline className="text-3xl" />
            </div>

            <h2 className="text-[1.8rem] font-semibold mt-3">Hello there 👋</h2>
            <p className="mt-2">
              Please enter your email & password to create an account.
            </p>

            <form className="flex flex-col gap-5 mt-[1rem]">
              {field.map((cur, id) => {
                return (
                  <div
                    className={`flex flex-col gap-2 ${
                      islogin === "Login" && cur == "name" ? "hidden" : "block"
                    }`}
                    key={id}
                  >
                    <p className="font-semibold capitalize text-lg">{cur}</p>
                    <div className="relative w-full">
                      <input
                        type={
                          cur === "password"
                            ? !isShow
                              ? "password"
                              : "text"
                            : cur === "email"
                            ? "email"
                            : "text"
                        }
                        name={cur}
                        placeholder={cur}
                        className={`bg-gray-100 py-3 px-5  rounded-md text-lg outline-none bordre-none w-full placeholder:capitalize`}
                        required={true}
                      />
                      {cur === "password" ? (
                        <FaEye
                          className="absolute right-3 z-888 cursor-pointer text-xl top-1/2 -translate-y-1/2"
                          onClick={() => {
                            setIsShow(!isShow);
                          }}
                        />
                      ) : cur === "email" ? (
                        <MdEmail className="absolute right-3 z-888 text-xl top-1/2 -translate-y-1/2" />
                      ) : (
                        <MdDriveFileRenameOutline className="absolute z-888 right-3 text-xl top-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                );
              })}
              <button
                islogin={"submit"}
                className="bg-blue mt-3 rounded-md text-white text-xl py-3 cursor-pointer"
              >
                {islogin}
              </button>
            </form>
            <p className="mt-5 text-lg ">
              Already have an account?
              <span
                className="text-black ml-1 underline cursor-pointer"
                onClick={() => {
                  islogin === "Login"
                    ? setislogin("Sign up")
                    : setislogin("Login");
                }}
              >
                {islogin === "Login" ? "Sign up" : "log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
