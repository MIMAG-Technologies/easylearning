import React, { useContext, useEffect, useState } from "react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";

function MobileNavbar() {
  const { categoriesList, coursesList } = useContext(ResoursesContext);
  const [isLevel1Open, setisLevel1Open] = useState(false);
  useEffect(() => {
    if (isLevel1Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLevel1Open]);
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
        }}
        className="level1"
      >
        <div className="sectors">
          <Link>For Individuals</Link>
          <Link>For Corporates</Link>
          <Link>For Universities</Link>
          <Link>For Governments</Link>
        </div>
        <div className="categories">
          <h3>Goals</h3>
          <Link to={"/courses"}>Explore all courses</Link>
          <h3>Categories</h3>
          {categoriesList.map((category) => (
            <p key={category._id}>
              {category.name} <ChevronRight />
            </p>
          ))}
        </div>
        <div className="login-signin-box">
          <Link className="joininbtn">Join for Free</Link>
          <Link className="loginbtn">Log In</Link>
        </div>
      </nav>
    </>
  );
}

export default MobileNavbar;
