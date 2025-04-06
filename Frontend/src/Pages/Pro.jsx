import React from "react";
import Header_p from "./../UI/Header_p";
import ProData from "../Data/Pro.json";
import { FaCircleCheck } from "react-icons/fa6";
const Pro = () => {
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc">
        <div className="h-full cc w-full">
          <div className="container h-full">
            <div className="fixed w-full bg-white"><Header_p text="Upgrade to PRO!" logo={false} /></div>
            <div className="cc gap-5 pb-8 overflow-auto mt-[6rem]">
              {ProData.map((cur, id) => {
                const { color, heading, subheading, features, price } = cur;
                return (
                  <div
                    key={id}
                    className={`w-full rounded-md text-white overflow-hidden bg-gray-100`}
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
                          <div
                            className="flex items-center justify-start gap-3"
                            key={id}
                          >
                            <FaCircleCheck className="text-lg" />
                            <p className="text-xl">{features}</p>
                          </div>
                        );
                      })}
                    </div>
                    {/* price select plan*/}
                    {price && (
                      <div className="cc gap-3 mt-1 mb-5">
                        <p className="w-[94%] bg-gray-300 h-[.05rem] rounded-full"></p>
                        <button className="rounded-full w-[94%] py-3 text-white cursor-pointer"
                        style={{backgroundColor:color}}>
                          Select plan
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
