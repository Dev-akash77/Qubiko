import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useStore } from "../Context/Store";
const Layout = () => {
  const { heading } = useStore();
  return (
    <div className="min-h-[100dvh] w-screen cc"> 
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full w-full flex flex-col justify-between">
          <Header
            icon={heading.logo}
            text={heading.name}
            search={heading.search}
          />
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
          <Navbar />
        </div>
      </div>
      {/* <div className="w-full h-full bg-red-200 absolute bottom-0 z-[9999] rounded-tr-4xl rounded-tl-4xl">
            </div> */}
    </div>
  );
};

export default Layout;
