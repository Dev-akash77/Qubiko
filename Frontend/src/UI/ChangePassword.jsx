import React, { useState, useRef } from "react";
import { MdSecurity } from "react-icons/md";
import { MdOutgoingMail } from "react-icons/md";
import Header_p from "./Header_p";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/Store";
import Small_Loader from "./Small_Loader";
import { register_otp, reset_password, verify_otp } from "./../Api/Api";

const ChangePassword = () => {
  const [otpSend, setotpSend] = useState(false);
  const [change_password, setchange_password] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { token } = useStore();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); //! Only digits

    if (!value) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    let newOtp = [...otp];

    //! If user pastes 6 digits
    if (value.length === 6) {
      newOtp = value.split("").slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      return;
    }

    // !If user types a single digit
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 6) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  //   ! otp varification
  const handle_otp_varification = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Please enter the full 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const data = await verify_otp(token, { otp: finalOtp });
      if (data?.success) {
        toast.success(data?.message);
        setchange_password(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // ! sending otp to email
  const handle_email_otp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await register_otp(token, { email });
      if (data?.success) {
        toast.success(data?.message);
        setotpSend(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // ! reset password
  const handle_reset_password = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await reset_password(token, { password });
      if (data?.success) {
        toast.success(data?.message);
        setotpSend(false);
        setchange_password(false);
        navigate("/account");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden cc w-full">
          <div className="container h-full">
            <Header_p text="Security" logo={false} />

            <div className="mt-2">
              <p className="text-xl font-medium">
                {change_password
                  ? "New Password"
                  : otpSend
                  ? "Reset Password OTP"
                  : "Reset Password"}
              </p>
              <p className="mt-2">
                {change_password
                  ? "Enter New Password"
                  : otpSend
                  ? "Enter 6-digit OTP sent to your email"
                  : "Enter your registered email"}
              </p>

              {/* ! send otp */}
              {otpSend && !change_password && (
                <form
                  onSubmit={handle_otp_varification}
                  className="flex flex-col items-center gap-5 mt-10"
                >
                  <div className="flex gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="w-10 h-12 text-center text-xl border-black border-2 rounded-md outline-none focus:border-3"
                        value={otp[i]}
                        onChange={(e) => handleChange(e, i)}
                        onKeyDown={(e) => handleBackspace(e, i)}
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[i] = el)}
                      />
                    ))}
                  </div>
                  <button
                    className="rounded-md cc w-full bg-blue text-white duration-500 py-3 outline-0 border-0 cursor-pointer"
                    type="submit"
                  >
                    {loading ? <Small_Loader /> : "Verify OTP"}
                  </button>
                </form>
              )}

              {/* ! send email */}
              {!otpSend && (
                <form
                  className="flex flex-col justify-center items-center gap-5 mt-12"
                  onSubmit={(e) => {
                    handle_email_otp(e);
                  }}
                >
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-100 px-2 rounded-md w-full">
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="@email"
                      className="h-full w-full outline-0 border-0 py-4"
                    />
                    <MdOutgoingMail className="text-xl text-gray-400" />
                  </div>
                  <button
                    className="rounded-md cc w-full bg-blue text-white duration-500 py-3 outline-0 border-0 cursor-pointer"
                    type="submit"
                  >
                    {loading ? <Small_Loader /> : "Send OTP"}
                  </button>
                </form>
              )}

              {/* ! reset password */}
              {change_password && (
                <div>
                  <form
                    className="flex flex-col justify-center items-center gap-5 mt-12"
                    onSubmit={(e) => {
                      handle_reset_password(e);
                    }}
                  >
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 px-2 py-4 rounded-md w-full">
                      <input
                        type="text"
                        required
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        placeholder="@password"
                        className="h-full w-full outline-0 border-0"
                      />
                      <MdSecurity className="text-xl text-gray-400" />
                    </div>
                    <button
                      className="rounded-md cc w-full bg-blue text-white duration-500 py-3 outline-0 border-0 cursor-pointer"
                      type="submit"
                    >
                      {loading ? <Small_Loader /> : "Submit"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
