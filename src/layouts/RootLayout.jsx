import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <Outlet></Outlet>
      <h1>Footer</h1>
    </div>
  );
};

export default RootLayout;
