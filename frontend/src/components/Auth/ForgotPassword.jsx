import React, { useState, useContext } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { sendOTP, checkOTP, updatePassword } = useContext(AuthContext);

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
  const SendOTP = async () => {
    const res = await sendOTP(formData.email, false);
    return res;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!formData.email) {
        toast.warn("Email is required!");
        return;
      }
      const status = await SendOTP();
      if (status === 200) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else if (status === 404) {
        toast.error("User Doesn't Exists!");
      } else {
        toast.error("Failed to send OTP!");
      }
    } else if (step === 2) {
      if (!otp) {
        toast.info("OTP is required!");
        return;
      }
      const isOtpValid = await checkOTP(formData.email, otp);
      if (isOtpValid) {
        setStep(3);
        toast.success("Email is validated successfully!");
      } else {
        toast.error("Invalid OTP!");
      }
    } else if (step === 3) {
      if (!formData.password) {
        toast.info("Password is required!");
        return;
      }
      const success = await updatePassword(formData.email, formData.password);
      if (success) {
        toast.success("Password updated successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to update password!");
      }
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
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label htmlFor="user-email">EMAIL</label>
              <input
                type="email"
                id="user-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="user-otp">OTP</label>
              <input
                type="text"
                id="user-otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          )}
          {step === 3 && (
            <>
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
            </>
          )}
          <button type="submit">
            {step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
