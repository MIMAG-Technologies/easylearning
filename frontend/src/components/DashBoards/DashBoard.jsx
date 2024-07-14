import React, { useEffect } from "react";
import "./DashBoard.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../Common/LogoutButton";

function DashBoard() {
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (loc.pathname === "/dashboard") {
      nav("/dashboard/mylearning");
    }
  }, []);

  return (
    <div className="DashBoard">
      <nav className="secondarynavbar">
        <Link
          className={loc.pathname.includes("mylearning") ? "sec-active" : ""}
          to="mylearning"
        >
          My Learning
        </Link>
        <Link
          className={loc.pathname.includes("myprofile") ? "sec-active" : ""}
          to="myprofile"
        >
          My Profile
        </Link>
        <LogoutButton />
      </nav>
      <Outlet />
    </div>
  );
}

export default DashBoard;
