import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

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

    // Basic validation
    if (formData.name.trim() === "") {
      toast.error("Name is required");
      return;
    }
    if (formData.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (formData.password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (formData.password.length < 8 || formData.password.length > 72) {
      toast.error("Password must be between 8 and 72 characters");
      return;
    }

    const status = await signin(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );
    if (status === 200) {
      toast.success("Teacher account created successfully");
      navigate(-1);
    } else {
      toast.error("Failed to create teacher account");
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
