import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";

function AdminNav() {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const loc = useLocation();
  useEffect(() => {
    if (user.role !== "admin" && user.name !== "") {
      navigate("/");
    }
    if (loc.pathname === "/admin") {
      navigate("/admin/category-management");
    }
  }, [user]);

  return (
    <>
      <div id="AdminNavTop">
        <h1>ADMIN PANEL</h1>
        <span>
          <button
            onClick={() => {
              navigate("reset-password");
            }}
          >
            Change Password
          </button>
          <button onClick={handleLogout}>Logout</button>
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
