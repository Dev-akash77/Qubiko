import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useStore } from "../Context/Store";

const Layout = () => {
  const {heading} = useStore();
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full w-full flex flex-col justify-between">
          <Header icon={heading.logo} text={heading.name} />
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
