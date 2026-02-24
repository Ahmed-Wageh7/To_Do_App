import React from "react";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-24">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
