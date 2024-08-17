import React, { useState, useContext } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AdminPasswordReset() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    oldpassword: "",
    password: "",
  });
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }
    if (!formData.oldpassword) {
      toast.error("Old Password is required!");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/resetpassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Password reset successful!");
      navigate(-1);
    } catch (error) {
      toast.error("Please Check you Old Password or try again later!");
      console.error(error);
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-password">OLD PASSWORD</label>
          <span id="password-container">
            {isPasswordVisible ? (
              <Eye onClick={togglePasswordVisibility} />
            ) : (
              <EyeOff onClick={togglePasswordVisibility} />
            )}
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-oldpassword"
              name="oldpassword"
              value={formData.oldpassword}
              onChange={handleInputChange}
              required
            />
          </span>
          <label htmlFor="user-password">NEW PASSWORD</label>
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
              required
              minLength={8}
              maxLength={72}
            />
            <p className="info-text">Between 8 and 72 characters</p>
          </span>

          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPasswordReset;
