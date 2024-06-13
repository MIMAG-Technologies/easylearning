import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SignIn() {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const { who } = useParams();
  const navigate = useNavigate();
  const { user, signin } = React.useContext(AuthContext);
  const validUsers = ["student", "teacher", "admin"];

  useEffect(() => {
    if (!validUsers.includes(who)) {
      navigate("/pagenotexists");
    }
    if (who === "teacher") {
      setFormData({
        ...formData,
        ["role"]: who,
      });
    }
    if (who === "teacher" && user.name !== "" && user.role !== "admin") {
      navigate("/");
    }
  }, [who, user, navigate]);

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
        <h2>{who === "student" ? "Sign up" : "Create Teacher"}</h2>
        <p>
          {who === "student"
            ? "Learn on your own time from top universities and businesses."
            : "Create a teacher account and start teaching."}
        </p>
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
          <button type="submit">
            {who === "student" ? "Join for Free" : "Create Teacher"}
          </button>

          {who === "student" && (
            <>
              <div className="line"></div>
              <p className="have_an_account">
                Already have an account?
                <Link to="/auth/login/student">Log in</Link>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
