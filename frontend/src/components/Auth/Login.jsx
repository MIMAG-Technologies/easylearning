import React, { useState, useEffect, useContext } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const { who } = useParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const validUsers = ["student", "teacher", "admin"];
    if (validUsers.includes(who)) {
      setUser(who);
    } else {
      navigate("/pagenotexists");
    }
  }, [who, navigate]);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login using AuthContext login function
    try {
      await login(email, password, user);
      // Redirect based on user type after successful login
      if (user === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      // Handle login error if needed
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
        <h2>Welcome Back</h2>
        <p>Login as a {user}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-email">EMAIL</label>
          <input
            type="email"
            id="user-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="user-password">PASSWORD</label>
          <span id="password-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordVisible ? (
              <Eye onClick={togglePasswordVisibility} />
            ) : (
              <EyeOff onClick={togglePasswordVisibility} />
            )}
            <p className="info-text">Forgot Password?</p>
          </span>
          <button type="submit">Login</button>
          <div className="line"></div>
          <p className="have_an_account">
            Already have an account? <Link to="/">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
