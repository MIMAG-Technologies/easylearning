import React, { useState, useEffect, useContext } from "react";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserCourse } from "../utils/courseUtils";
import { AuthContext } from "../../context/AuthContext";

function UserCourses() {
  const [courses, setCourses] = useState({ courses: [] });

  const { user } = useContext(AuthContext);
  const fetchCourse = async () => {
    try {
      const response = await getUserCourse("me");
      setCourses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="UserCourses">
      <h3>My Learning</h3>
      {courses?.courses.length === 0 ? (
        <h1>No Courses To Display</h1>
      ) : (
        <div className="mycourses">
          {courses.courses.map((course) => (
            <div key={course._id} className="myonecourse">
              <img src={course.thumbnailUrl} alt={course.title} />
              <span>
                <p>Course | {course.providingInstitution}</p>
                <h4>{course.title}</h4>
              </span>
              <div className="verticalLine"></div>
              <Link
                to={
                  user.role === "student"
                    ? `/mylearning/me/${course._id}`
                    : `/dashboard/mylearning/${course._id}/students`
                }
              >
                Go To Course <MoveRight />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCourses;
