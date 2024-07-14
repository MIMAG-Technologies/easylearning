import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function TeacherSignIn() {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher",
  });
  const navigate = useNavigate();
  const { user, signin } = React.useContext(AuthContext);

  useEffect(() => {
    if (user.name !== "" && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setisPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(
        formData.name,
        formData.email,
        formData.password,
        formData.role
      );
      navigate(-1);
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  return (
    <div id="AuthContainer">
      <div id="Auth">
        <X
          className="x-btn"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h2>Create Teacher</h2>
        <p>Create a teacher account and start teaching.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-name">FULL NAME</label>
          <input
            type="text"
            id="user-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="user-email">EMAIL</label>
          <input
            type="email"
            id="user-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label htmlFor="user-password">PASSWORD</label>
          <span id="password-container">
            {isPasswordVisible ? (
              <Eye onClick={togglePasswordVisibility} />
            ) : (
              <EyeOff onClick={togglePasswordVisibility} />
            )}
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className="info-text">Between 8 and 72 characters</p>
          </span>
          <button type="submit">Create Teacher</button>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignIn;
