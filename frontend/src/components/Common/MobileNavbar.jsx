import React, { useContext, useState } from "react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";
import noProfilePhoto from "../../assets/Images/profile-pic.png";
import { AuthContext } from "../../context/AuthContext";

function MobileNavbar() {
  const { categoriesList } = useContext(ResoursesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loc = useLocation();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [isLevel1Open, setIsLevel1Open] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageError = (e) => {
    e.target.src = noProfilePhoto; // Set the source to the alternative image in case of error
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchBoxOpen(false);
      setIsLevel1Open(false); // Close level 1 navigation if search is submitted
    }
  };

  const toggleSearchBox = () => {
    setIsSearchBoxOpen((prev) => !prev);
    setIsLevel1Open(false); // Close level 1 navigation when toggling search box
  };

  const toggleLevel1 = () => {
    setIsLevel1Open((prev) => !prev);
    setIsSearchBoxOpen(false); // Close search box when toggling level 1 navigation
  };

  return (
    <>
      <nav
        className="MobileNavbar"
        style={{
          borderBottom: loc.pathname.includes("dashboard")
            ? "none"
            : "1px solid gray",
        }}
      >
        <Menu size={30} onClick={toggleLevel1} />
        {isSearchBoxOpen ? (
          <div className="searchbox">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearchSubmit}>
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>
        ) : (
          <Link to={"/"} className="logo">
            <img
              style={{
                height: "6vh",
                marginRight: "5px",
              }}
              src="\assets\logo\apple-touch-icon.png"
              alt=""
            />
            Psycortex Online Education{" "}
          </Link>
        )}

        {isLevel1Open || isSearchBoxOpen ? (
          <X
            size={30}
            onClick={() => {
              setIsLevel1Open(false);
              setIsSearchBoxOpen(false);
            }}
          />
        ) : (
          <Search size={30} strokeWidth={1.5} onClick={toggleSearchBox} />
        )}
      </nav>

      <nav
        className="level1"
        style={{
          left: isLevel1Open ? "0px" : "-100%",
          gridTemplateRows: user.isLoggedIn ? "1fr 3fr 8fr" : "1fr 3fr 1fr",
        }}
      >
        {user.isLoggedIn && (
          <p className="user-info-tab">
            <img
              src={user.profilePhoto || noProfilePhoto}
              onError={handleImageError}
              alt=""
            />
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </p>
        )}

        <div className="sectors">
          <Link
            onClick={() => {
              setIsLevel1Open(false);
            }}
            to={"/"}
          >
            For Individuals
          </Link>
          <Link
            onClick={() => {
              setIsLevel1Open(false);
            }}
            to={"/"}
          >
            For Corporates
          </Link>
          <Link
            onClick={() => {
              setIsLevel1Open(false);
            }}
            to={"/"}
          >
            For Universities
          </Link>
          <Link
            onClick={() => {
              setIsLevel1Open(false);
            }}
            to={"/"}
          >
            For Governments
          </Link>
        </div>

        <div className="categories">
          <h3>Goals</h3>
          <Link
            onClick={() => {
              setIsLevel1Open(false);
            }}
            to={"/courses"}
          >
            Explore all courses
          </Link>
          <h3>Categories</h3>
          {categoriesList.map((category) => (
            <p key={category._id}>
              <Link
                onClick={() => {
                  setIsLevel1Open(false);
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
