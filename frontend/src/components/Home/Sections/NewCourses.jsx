import React, { useState, useContext } from "react";
import OneCourseCard from "../../Common/OneCourseCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ResoursesContext } from "../../../context/ResoursesContext";

function NewCourses(props) {
  const { coursesList } = useContext(ResoursesContext);
  const [displayedCourses, setDisplayedCourses] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setDisplayedCourses(coursesList.length);
    } else {
      setDisplayedCourses(4);
    }
  };

  return (
    <div className="NewCourses">
      <p style={{ color: "var(--primary-color)" }}> Courses and Certificates</p>
      <h1>New on Easy Learning</h1>
      <p>
        Explore our newest programs, focused on delivering in-demand skills.
      </p>
      <div>
        {coursesList.slice(0, displayedCourses).map((course, index) => (
          <OneCourseCard key={index} course={course} />
        ))}
      </div>
      <span>
        <button onClick={toggleShowAll}>
          {showAll ? "Show less" : `Show all ${coursesList.length - 4}`}
        </button>
        <Link>
          View all <ArrowRight />
        </Link>
      </span>
    </div>
  );
}

export default NewCourses;
