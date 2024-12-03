import React, { useState, useEffect, useContext } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    if (!email || !password) {
      toast.warn("Email and password are required!");
      return;
    } 

    const status = await login(email, password, user);
    // Redirect based on user type after successful login
    if (status === 200) {
      toast.success("Successfully logged in");
      if (user === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      toast.error("Login failed. Please check your credentials and try again.");
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
            <p
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
              className="info-text"
            >
              Forgot Password?
            </p>
          </span>
          <button type="submit">Login</button>
          <div className="line"></div>
          <p className="have_an_account">
            Don't have an account?{" "}
            <Link to="/auth/signin/student">Sign up</Link>
          </p>
          <p className="have_an_account">
            Are you a {who === "student" ? "teacher" : "student"}?
            <Link
              to={`/auth/login/${who === "student" ? "teacher" : "student"}`}
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
