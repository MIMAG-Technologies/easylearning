import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignIn() {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isUser, setisUser] = useState(false);
  const { who } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (who === "user") {
      setisUser(true);
    } else if (who === "teacher") {
      setisUser(false);
    } else {
      navigate("/pagenotexiists");
    }
  }, [who]);

  const togglePasswordVisibility = () => {
    setisPasswordVisible(!isPasswordVisible);
  };

  return (
    <div id="AuthContainer">
      <div id="Auth">
        <X className="x-btn" />
        <h2> {isUser ? "Sign up" : "Create Teacher"} </h2>
        <p>
          {isUser
            ? "Learn on your own time from top universities and businesses."
            : "Create a teacher account and start teaching."}
        </p>
        <form action="">
          <label htmlFor="user-name">FULL NAME</label>
          <input type="text" id="user-name" />
          <label htmlFor="user-email">EMAIL</label>
          <input type="email" />
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
            />
            <p className="info-text">Between 8 and 72 characters</p>
          </span>
          <button type="submit">
            {" "}
            {isUser ? "Join for Free" : "Create Teacher"}
          </button>

          {isUser ? (
            <>
              <div className="line"></div>
              <p className="have_an_account">
                Already have an account?
                <Link to="/">Log in</Link>
              </p>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
