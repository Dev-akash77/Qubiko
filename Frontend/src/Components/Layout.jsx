import React from 'react'
import Navbar from './Navbar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen w-screen cc">
    <div className="mobile_Screen md:border md:rounded-md cc">
      <div className="h-full w-full flex flex-col justify-between">
        <Header icon={"logo"} text={"Qubiko AI"}/>
        <Outlet />
        <Navbar />
      </div>
    </div>
  </div>
  )
}

export default Layout



