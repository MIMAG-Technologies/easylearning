import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";

function AdminNav() {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);
  useEffect(() => {
    if (user.role !== "admin" && user.name !== "") {
      navigate("/");
    }
  }, [user]);

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
