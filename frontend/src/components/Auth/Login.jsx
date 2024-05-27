import { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [user, setUser] = useState("");
  const { who } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const validUsers = ["user", "teacher", "admin"];
    if (validUsers.includes(who)) {
      setUser(who);
    } else {
      navigate("/pagenotexists");
    }
  }, [who, navigate]);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  return (
    <div id="AuthContainer">
      <div id="Auth">
        <X className="x-btn" />
        <h2>Welcome Back</h2>
        <p>Login as a {user}</p>
        <form>
          <label htmlFor="user-email">EMAIL</label>
          <input type="email" id="user-email" />
          <label htmlFor="user-password">PASSWORD</label>
          <span id="password-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="user-password"
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
