import React, { useState, useContext } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

function StudentSignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "student",
  });
  const navigate = useNavigate();
  const { signin, sendOTP, checkOTP } = useContext(AuthContext);

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

    if (step === 1) {
      if (!formData.email) {
        toast.warn("Email is required!");
        return;
      }
      const status = await SendOTP();
      if (status === 200) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else if (status === 400) {
        toast.warn("User Already Exists!");
      } else {
        toast.error("Failed to send OTP!");
      }
    } else if (step === 2) {
      if (!otp) {
        toast.warn("OTP is required!");
        return;
      }
      const isOtpValid = await VerifyOTP();
      if (isOtpValid) {
        setStep(3);
        toast.success("Email is validated successfully!");
      } else {
        toast.error("Invalid OTP!");
      }
      return;
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.contactNumber
      ) {
        toast.warn("All fields are required!");
        return;
      }

      const status = await signin(
        formData.name,
        formData.email,
        formData.password,
        formData.contactNumber,
        formData.role
      );
      if (status === 200) {
        navigate("/");
        toast.success("Signed in successfully!");
      } else {
        toast.error("Failed to sign in!");
      }
    }
  };

  const SendOTP = async () => {
    const res = await sendOTP(formData.email, true);
    return res;
  };
  const VerifyOTP = async () => {
    const res = await checkOTP(formData.email, otp);
    return res;
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
        <h2>Sign up</h2>
        <p>Learn on your own time from top universities and businesses.</p>
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
              <label htmlFor="user-name">FULL NAME</label>
              <input
                type="text"
                id="user-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="user-number">CONTACT NUMBER</label>
              <input
                type="tel"
                id="user-number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
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
              : "Join for Free"}
          </button>
          <div className="line"></div>
          <p className="have_an_account">
            Already have an account?
            <Link to="/auth/login/student">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentSignIn;
