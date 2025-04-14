import React, { useEffect } from "react";
import { useStore } from "../Context/Store";
import data from "../Data/AiAssistent.json";

const Assistent = () => {
  const { setheading } = useStore();

  useEffect(() => {
    setheading({ name: "Assistent", logo: false });
  }, [setheading]);

  return (
    <div className="h-full cc ">
      <div className="container h-full pb-3 flex flex-col gap-2">
        {data.map((cur, id) => {
          return (
            <div key={id}>
              <h2 className={`text-xl font-semibold ${id!==0?"mt-3":""}`}>{cur.heading}</h2>
              <div className="flex flex-col mt-2 gap-5">
                {cur.content.map((curElem, index) => {
                  return (
                    <div key={index} className="bg-gray-100 rounded-md p-3">
                      <h2 className="text-lg font-medium">
                        {curElem.headingContent}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {curElem.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Assistent;
