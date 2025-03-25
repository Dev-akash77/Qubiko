import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full w-full flex flex-col justify-between">
          <Header icon={"logo"} text={"Qubiko AI"} />
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        
          <h1> nav bar</h1>
        </div>
      </div>
    </div>
  );
};

export default Layout;
