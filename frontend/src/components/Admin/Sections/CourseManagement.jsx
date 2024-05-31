import React, { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import OneCourseCard from "../../Common/OneCourseCard";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchCourses } from "../../utils/courseUtils";

function CourseManagement() {
  const [coursesList, setCoursesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const loc = useLocation();

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const data = await fetchCourses();
        setCoursesList(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCoursesData();
  }, [loc.pathname]);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCourses = coursesList.filter((course) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowercasedQuery) ||
      course.category.name.toLowerCase().includes(lowercasedQuery) ||
      course.providingInstitution.toLowerCase().includes(lowercasedQuery) ||
      course.level.toLowerCase().includes(lowercasedQuery) ||
      course.belongTo.toLowerCase().includes(lowercasedQuery)
    );
  });

  return (
    <>
      <Outlet />
      <div className="admin-searchbar">
        <input
          placeholder="Search by title, category, institution, level, or sector"
          className="input-style"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          onClick={() => {
            navigate("/admin/course-management/create-course");
          }}
        >
          <CirclePlus />
          Add Course
        </button>
      </div>
      <div className="courses-container">
        {filteredCourses.map((course) => (
          <OneCourseCard key={course._id} course={course} />
        ))}
      </div>
    </>
  );
}

export default CourseManagement;
