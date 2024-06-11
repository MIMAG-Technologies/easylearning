import { ChevronDown, ChevronRight, Search } from "lucide-react";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";

const MAX_COURSE = 2;

function Navbar() {
  const [translated, setTranslated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [groupedCourses, setGroupedCourses] = useState({});
  const [currentActiveCategory, setCurrentActiveCategory] = useState("");
  const [isCourseListSectionActive, setIsCourseListSectionActive] =
    useState(false);

  const handleScroll = useCallback(() => {
    if (!translated && window.scrollY >= window.innerHeight * 0.06) {
      setTranslated(true);
    } else if (translated && window.scrollY < window.innerHeight * 0.06) {
      setTranslated(false);
    }
  }, [translated]);
  const loc = useLocation();
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsCourseListSectionActive(false);
  }, [loc.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { categoriesList, coursesList } = useContext(ResoursesContext);
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

  return (
    <>
      <nav
        id="CommonNavbar"
        style={{ transform: `translateY(${translated ? "-6vh" : "0"})` }}
      >
        <div className="upperNav">
          <Link className="sector-active">For Individuals</Link>
          <Link>For Corporates</Link>
          <Link>For Universities</Link>
          <Link>For Governments</Link>
        </div>
        <div
          className="lowerNav"
          onMouseEnter={() => {
            setCurrentActiveCategory("");
            setIsDropdownOpen(false);
          }}
        >
          <Link to={"/"} className="logo">
            Easy Learning
          </Link>
          <button
            onMouseEnter={() => {
              setIsDropdownOpen(true);
            }}
          >
            Explore <ChevronDown strokeWidth={1.5} />
          </button>
          <div className="searchbox">
            <input type="text" placeholder="What do you want to learn?" />
            <Link>
              <Search size={20} strokeWidth={1.5} />{" "}
            </Link>
          </div>
          <p>
            <Link to={"/auth/login/student"}>Login</Link>
          </p>
          <button>
            <Link to={"/auth/signin/student"}>Join For Free</Link>
          </button>
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
