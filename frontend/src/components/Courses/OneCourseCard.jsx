import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./OneCourse.css";
import { Pencil, Star, Trash2 } from "lucide-react";
import instituteimg from "../../assets/Images/instituteimg.png";
import noImg from "../../assets/Images/no-thumbnail.jpg";
import { toast } from "react-toastify";
import { deleteCourse } from "../utils/courseUtils";

function OneCourseCard(props) {
  function truncateTitle(title) {
    if (title.length > 50) {
      return title.slice(0, 47) + "...";
    } else {
      return title;
    }
  }
  const avgrating = (rating) => {
    if (rating.length === 0) {
      return 0; // Return 0 or another appropriate value when there are no ratings
    }
    let sum = 0;
    rating.forEach((element) => {
      sum += element.rating;
    });
    return sum / rating.length;
  };

  const loc = useLocation();
  const navigate = useNavigate();
  const { course } = props;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/admin/course-management/edit-course/${course._id}`);
  };
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(course._id);
        toast.success("Course deleted successfully!");
        window.location.reload();
      } catch (error) {
        toast.error("Error deleting course");
      }
    } else {
      toast.warn("Action cancelled!");
    }
  };

  const handleImageError = (e) => {
    e.target.src = noImg; // Set the source to the alternative image in case of error
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
      <img src={course.thumbnailUrl} onError={handleImageError} alt="" />
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
        {avgrating(course.reviews)} ({course.reviews.length} reviews)
      </span>
      <span>
        {course.level} ● Course ● {course.expectedDuration}
        {loc.pathname === "/admin/course-management" && (
          <>
            <Pencil
              size={16}
              className="editCoursebtn"
              onClick={handleEditClick}
            />
            <Trash2
              size={16}
              className="editCoursebtn"
              onClick={handleDeleteClick}
              style={{
                backgroundColor: "#ff4141",
              }}
            />
          </>
        )}
      </span>
    </Link>
  );
}

export default OneCourseCard;
