import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./NavFooter.css";

function NavFooter() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 900 ? <Navbar /> : <MobileNavbar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default NavFooter;
