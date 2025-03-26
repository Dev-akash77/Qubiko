import React, { useEffect } from "react";
import Authentication from "./Authentication";
import { useStore } from "../Context/Store";
import { useNavigate } from "react-router-dom";

const Login_Signup = () => {
  const { islogin, setislogin, token } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  // ! if user request for login and signup
  if (islogin) {
    return <Authentication />;
  }

  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen cc">
        <div className="h-full w-full flex flex-col justify-between bg-gradient-to-b from-[#bfcaff] to-[#ff9afd] md:rounded-sm cc gap-[3rem]">
          <h1 className="text-4xl leading-[3rem] font-semibold text-black">
            Welcome to <br /> Qubiko AI 👋
          </h1>
          <div className="flex flex-col justify-center items-center container gap-5">
            <button
              className="bg-blue w-full text-white rounded-full py-3 text-lg cursor-pointer"
              onClick={() => {
                setislogin("Login");
              }}
            >
              Log in
            </button>
            <button
              className="bg-white w-full text-blue rounded-full py-3 text-lg cursor-pointer"
              onClick={() => {
                setislogin("Sign up");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
