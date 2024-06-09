import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OneCourse.css";
import { Pencil, Star } from "lucide-react";
import instituteimg from "../../assets/Images/instituteimg.png";
import noImg from "../../assets/Images/no-thumbnail.jpg";

function OneCourseCard(props) {
  function truncateTitle(title) {
    if (title.length > 50) {
      return title.slice(0, 47) + "...";
    } else {
      return title;
    }
  }

  const loc = useLocation();
  const navigate = useNavigate();
  const { course } = props;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/admin/course-management/edit-course/${course._id}`);
  };

  return (
    <Link
      to={
        loc.pathname === "/admin/course-management"
          ? `view-course/${btoa(course._id)}`
          : `/course/${btoa(course._id)}`
      }
      className="OneCourseCard"
    >
      <img
        src={course.thumbnailUrl === "" ? noImg : course.thumbnailUrl}
        alt=""
      />
      <span>
        <img src={instituteimg} alt="" />
        <p>{course.providingInstitution}</p>
      </span>
      <h3 className="course_title">{truncateTitle(course.title)}</h3>

      <span>
        <Star
          size={20}
          className="star"
          color="#F2D049"
          strokeWidth={1.75}
          absoluteStrokeWidth
        />
        0.0 (0 reviews)
      </span>
      <span>
        {course.level} ● Course ● {course.expectedDuration}
        {loc.pathname === "/admin/course-management" && (
          <Pencil
            size={16}
            className="editCoursebtn"
            onClick={handleEditClick}
          />
        )}
      </span>
    </Link>
  );
}

export default OneCourseCard;
