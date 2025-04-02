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
              !isOpenDeleteMessage ? "w-0 h-0" : "w-full h-full"
            } absolute z-[9999]`}
          >
            <div className="w-full h-full bg-black opacity-[.4]"></div>
            <div
              className={`${
                !isOpenDeleteMessage ? "w-0 h-0 opacity-0" : "w-full h-[15rem]"
              } rounded-tr-4xl rounded-tl-4xl bg-white bottom-0 absolute
              `}
            >
              <DeleteNotificaton
                action={deleteNotification.action}
                heading={deleteNotification.heading}
                content={deleteNotification.content}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
