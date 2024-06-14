import { ChevronDown, ChevronRight, Search } from "lucide-react";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";
import { AuthContext } from "../../context/AuthContext";
import noProfilePhoto from "../../assets/Images/profile-pic.png";

const MAX_COURSE = 2;

function Navbar() {
  const [translated, setTranslated] = useState(false);
  const [sectorActive, setsectorActive] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupedCourses, setGroupedCourses] = useState({});
  const [currentActiveCategory, setCurrentActiveCategory] = useState("");
  const [isCourseListSectionActive, setIsCourseListSectionActive] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleImageError = (e) => {
    e.target.src = noProfilePhoto; // Set the source to the alternative image in case of error
  };

  const handleScroll = useCallback(() => {
    if (!translated && window.scrollY >= window.innerHeight * 0.06) {
      setTranslated(true);
    } else if (translated && window.scrollY < window.innerHeight * 0.06) {
      setTranslated(false);
    }
  }, [translated]);

  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsCourseListSectionActive(false);
    setSearchQuery(""); // Clear search input on route change
  }, [loc.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { categoriesList, coursesList } = useContext(ResoursesContext);
  const { user } = useContext(AuthContext);
  if (!Array.isArray(categoriesList)) {
    return <div>Loading...</div>; // Or some other fallback UI
  }
  if (!Array.isArray(coursesList)) {
    return <div>Loading...</div>; // Or some other fallback UI
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    setGroupedCourses(groupByCategory(coursesList));
  }, [coursesList]);

  function groupByCategory(courses) {
    return courses.reduce((acc, course) => {
      const categoryName = course.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(course);
      return acc;
    }, {});
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/courses?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <>
      <nav
        id="CommonNavbar"
        style={{ transform: `translateY(${translated ? "-5.5vh" : "0"})` }}
      >
        <div className="upperNav">
          <Link
            onClick={() => {
              setsectorActive(1);
            }}
            className={sectorActive === 1 ? "sector-active" : ""}
          >
            For Individuals
          </Link>
          <Link
            onClick={() => {
              setsectorActive(2);
            }}
            className={sectorActive === 2 ? "sector-active" : ""}
          >
            For Corporates
          </Link>
          <Link
            onClick={() => {
              setsectorActive(3);
            }}
            className={sectorActive === 3 ? "sector-active" : ""}
          >
            For Universities
          </Link>
          <Link
            onClick={() => {
              setsectorActive(4);
            }}
            className={sectorActive === 4 ? "sector-active" : ""}
          >
            For Governments
          </Link>
        </div>
        <div
          className="lowerNav"
          onMouseEnter={() => {
            setCurrentActiveCategory("");
            setIsDropdownOpen(false);
          }}
        >
          <Link to={"/"} className="logo">
            <img src="assets\logo\PsycortexLogo.png" alt="" />
          </Link>
          <button
            onMouseEnter={() => {
              setIsDropdownOpen(true);
            }}
          >
            Explore <ChevronDown strokeWidth={1.5} />
          </button>
          <div className="searchbox">
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearchSubmit}>
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>
          {user.isLoggedIn ? (
            <>
              <p className="user-info-tab">
                <img
                  src={
                    user.profilePhoto === ""
                      ? noProfilePhoto
                      : user.profilePhoto
                  }
                  onError={handleImageError}
                  alt=""
                />
                <Link>{user.name}</Link>
              </p>
            </>
          ) : (
            <>
              <p>
                <Link to={"/auth/login/student"}>Login</Link>
              </p>
              <button>
                <Link to={"/auth/signin/student"}>Join For Free</Link>
              </button>
            </>
          )}
        </div>
      </nav>
      {isDropdownOpen && (
        <nav
          className="dropdown"
          style={{
            top: !translated ? "12.5vh" : "7.4vh",
          }}
        >
          <div
            className="emptyarea1"
            onMouseEnter={() => {
              setIsDropdownOpen(false);
            }}
          ></div>
          <div
            onMouseEnter={() => {
              setIsDropdownOpen(true);
            }}
            style={{
              height: !translated ? "85.2vh" : "91.2vh",
            }}
            className="optionmenu"
          >
            <h3
              onMouseEnter={() => {
                setCurrentActiveCategory("");
              }}
            >
              Goals
            </h3>
            <Link
              to={"/courses"}
              onMouseEnter={() => {
                setCurrentActiveCategory("");
              }}
            >
              Explore all courses
            </Link>
            <h3
              onMouseEnter={() => {
                setCurrentActiveCategory("");
              }}
            >
              Categories
            </h3>
            {categoriesList.map((category) => (
              <p
                key={category._id}
                onMouseEnter={() => {
                  setCurrentActiveCategory(category.name);
                  setIsCourseListSectionActive(true);
                }}
              >
                {category.name} <ChevronRight />
              </p>
            ))}
          </div>
          {isCourseListSectionActive && currentActiveCategory !== "" && (
            <div
              className="courses-display"
              style={{
                height: !translated ? "85.2vh" : "91.2vh",
              }}
            >
              <h1>{currentActiveCategory}</h1>
              <p>Courses</p>
              {groupedCourses[currentActiveCategory]
                ?.slice(0, MAX_COURSE)
                .map((course) => (
                  <Link
                    to={`/course/${btoa(course._id)}`}
                    key={course._id}
                    className="onenavbarcourse"
                  >
                    <img src={course.thumbnailUrl} alt="" />
                    <span>
                      <p>{course.providingInstitution}</p>
                      <h4>{course.title}</h4>
                    </span>
                  </Link>
                ))}
              {groupedCourses[currentActiveCategory]?.length > MAX_COURSE && (
                <Link
                  to={`/courses?category=${currentActiveCategory}`}
                  className="view-more"
                >
                  View More
                </Link>
              )}
            </div>
          )}
          <div
            className="emptyarea2"
            onMouseEnter={() => {
              setIsDropdownOpen(false);
            }}
          ></div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
