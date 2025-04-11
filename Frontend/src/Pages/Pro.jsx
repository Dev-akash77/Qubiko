import React from "react";
import Header_p from "./../UI/Header_p";
import ProDataJson from "../Data/Pro.json";
import ProData from "../UI/ProData";
import DeleteNotificaton from "../Components/DeleteNotificaton";
import { useStore } from "../Context/Store";

const Pro = () => {
  const { heading, deleteNotification, isOpenDeleteMessage } = useStore();
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc relative">
        {/* Outer flex container needs full height */}
        <div className="h-full flex flex-col">
          {/* Sticky/fixed Header */}
          <div>
            <Header_p text="Upgrade to PRO!" logo={false} />
          </div>

          {/* Scrollable content */}
          <div className="grow overflow-auto px-4 py-2 pb-8">
            {ProDataJson.map((cur, id) => (
              <ProData key={id} data={cur} id={id} />
            ))}
          </div>

          <div
            className={`${
              !isOpenDeleteMessage ? "notopen" : "w-full h-full"
            } absolute z-[9999] bottom-0 left-0`}
          >
            <div className="w-full h-full bg-black opacity-[.4]"></div>
            <div
              className={`${
                !isOpenDeleteMessage ? "notopen" : "oepn"
              } rounded-tr-4xl rounded-tl-4xl bg-white bottom-0 absolute duration-300
              `}
            >
              <DeleteNotificaton
                action={deleteNotification.action}
                heading={deleteNotification.heading}
                content={deleteNotification.content}
                onConfirm={deleteNotification.onConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pro;
