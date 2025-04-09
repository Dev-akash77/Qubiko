import React, { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useStore } from "../Context/Store";
import Small_Loader from "./Small_Loader";
import { api, razorpay_verify, razorpayPayment } from "../Api/Api";
import { toast } from "react-toastify";

const ProData = ({ data, id }) => {
  const { color, heading, subheading, features, price, plan } = data;
  const [loading, setloading] = useState(false);
  const { profileData, token, profileRefetch } = useStore();

  // ! payment
  const initpay = (data) => {
    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Qubiko AI",
      description: "Pro Mode Payment",
      order_id: data.order.id,
      handler: async function (response) {
        console.log("Payment Success Response", response);
        const verifyData = await razorpay_verify(
          token,
          response?.razorpay_order_id,
          data?.plan
        );
        if (verifyData?.success) {
          toast.success(verifyData.message);
          profileRefetch();
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ! select plan
  const handleSelectPlan = async (plan) => {
    try {
      setloading(true);
      const data = await razorpayPayment(
        token,
        plan,
        profileData?.profile._id,
        price
      );
      if (data?.success) {
        initpay(data);
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div
      className={`w-full rounded-md text-white overflow-hidden bg-gray-100 ${
        id !== 0 ? "mt-[2rem]" : "mt-0"
      }`}
    >
      {/* heading */}
      <div
        className="cc w-full h-[8rem] flex flex-col gap-2"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-3xl font-semibold">{heading}</h2>
        <p>{subheading}</p>
      </div>
      {/* features */}
      <div className="flex flex-col p-7 text-black gap-3">
        {features.map((features, id) => {
          return (
            <div className="flex items-center justify-start gap-3" key={id}>
              <FaCircleCheck className="text-lg" />
              <p className="text-xl">{features}</p>
            </div>
          );
        })}
      </div>
      {/* price select plan*/}
      {price &&
        (plan === profileData?.profile.plan ? (
          <div className="cc gap-3 mt-1 mb-5">
            <p className="w-[94%] bg-gray-300 h-[.05rem] rounded-full"></p>
            <button
              className="rounded-full w-[94%] py-3 cursor-default cc"
              style={{ border: `.2rem solid ${color}`, color: color }}
            >
              Selected
            </button>
          </div>
        ) : (
          <div className="cc gap-3 mt-1 mb-5">
            <p className="w-[94%] bg-gray-300 h-[.05rem] rounded-full"></p>
            <button
              className="rounded-full w-[94%] py-3 text-white cursor-pointer cc"
              style={{ backgroundColor: color }}
              onClick={() => {
                handleSelectPlan(plan, price);
              }}
            >
              {loading ? <Small_Loader /> : "Select plan"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default ProData;
