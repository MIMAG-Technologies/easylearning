import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Admin.css";

function AdminNav() {
  return (
    <>
      <div id="AdminNavTop">
        <h1>ADMIN PANEL</h1>
        <span>
          <button>Change Password</button>
          <button>Logout</button>
        </span>
      </div>
      <Outlet />
      <div id="AdminNavBottom">
        <NavLink to={"category-management"}>Category</NavLink>
        <NavLink to={"course-management"}>Courses</NavLink>
        <NavLink to={"student-management"}>Students</NavLink>
        <NavLink to={"teacher-management"}>Teacher</NavLink>
      </div>
    </>
  );
}

export default AdminNav;
