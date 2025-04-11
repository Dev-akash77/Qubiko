import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useStore } from "../Context/Store";
import DeleteNotificaton from "./DeleteNotificaton";
const Layout = () => {
  const { heading, deleteNotification, isOpenDeleteMessage } = useStore();

  return (
    <div className="min-h-[100dvh] w-screen cc ">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full w-full flex flex-col justify-between relative">
          <Header
            icon={heading.logo}
            text={heading.name}
            search={heading.search}
          />
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
          <Navbar />
          <div
            className={`${
              !isOpenDeleteMessage ? "notopen" : "w-full h-full"
            } absolute z-[9999] bottom-0`}
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

export default Layout;
