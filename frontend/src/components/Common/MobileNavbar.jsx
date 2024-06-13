import React, { useContext, useEffect, useState } from "react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";
import noProfilePhoto from "../../assets/Images/profile-pic.png";
import { AuthContext } from "../../context/AuthContext";

function MobileNavbar() {
  const { categoriesList, coursesList } = useContext(ResoursesContext);
  const { user } = useContext(AuthContext);

  const [isLevel1Open, setisLevel1Open] = useState(false);
  useEffect(() => {
    if (isLevel1Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLevel1Open]);
  if (!Array.isArray(categoriesList)) {
    return <div>Loading...</div>; // Or some other fallback UI
  }
  if (!Array.isArray(coursesList)) {
    return <div>Loading...</div>; // Or some other fallback UI
  }
  const handleImageError = (e) => {
    e.target.src = noProfilePhoto; // Set the source to the alternative image in case of error
  };
  return (
    <>
      <nav className="MobileNavbar">
        <Menu
          size={30}
          style={{
            visibility: !isLevel1Open ? "visible" : "hidden",
          }}
          onClick={() => {
            setisLevel1Open(!isLevel1Open);
          }}
        />

        <Link to={"/"} className="logo">
          Easy Learning
        </Link>
        {isLevel1Open ? (
          <X
            onClick={() => {
              setisLevel1Open(!isLevel1Open);
            }}
            size={30}
          />
        ) : (
          <Search size={30} strokeWidth={1.5} />
        )}
      </nav>

      <nav
        style={{
          left: isLevel1Open ? "0px" : "-100%",
          gridTemplateRows: user.isLoggedIn ? "1fr 2fr 6fr" : "2fr 6fr 2.5fr",
        }}
        className="level1"
      >
        {user.isLoggedIn && (
          <>
            <p
              className="user-info-tab"
              style={{
                borderBottom: "1px solid rgb(209, 208, 208)",
                padding: "20px",
              }}
            >
              <img
                src={
                  user.profilePhoto === "" ? noProfilePhoto : user.profilePhoto
                }
                onError={handleImageError}
                alt=""
              />
              <Link>{user.name}</Link>
            </p>
          </>
        )}

        <div className="sectors">
          <Link>For Individuals</Link>
          <Link>For Corporates</Link>
          <Link>For Universities</Link>
          <Link>For Governments</Link>
        </div>
        <div className="categories">
          <h3>Goals</h3>
          <Link
            to={"/courses"}
            onClick={() => {
              setisLevel1Open(!isLevel1Open);
            }}
          >
            Explore all courses
          </Link>
          <h3>Categories</h3>
          {categoriesList.map((category) => (
            <p key={category._id}>
              <Link
                onClick={() => {
                  setisLevel1Open(!isLevel1Open);
                }}
                to={`/courses?category=${encodeURIComponent(category.name)}`}
              >
                {category.name} <ChevronRight />
              </Link>
            </p>
          ))}
        </div>
        {!user.isLoggedIn && (
          <div className="login-signin-box">
            <Link className="joininbtn" to={"/auth/signin/student"}>
              Join for Free
            </Link>
            <Link className="loginbtn" to={"/auth/login/student"}>
              Log In
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default MobileNavbar;
