import React, { useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResoursesContext } from "../../context/ResoursesContext";
import OneCourseCard from "./OneCourseCard";
import { SlidersHorizontal, X } from "lucide-react";

function BrowseCourse() {
  const { categoriesList, coursesList } = useContext(ResoursesContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedBelongsTo, setSelectedBelongsTo] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltetMode, setmobileFiltetMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    selectedCategories.forEach((category) =>
      params.append("category", category)
    );
    selectedLevels.forEach((level) => params.append("level", level));
    selectedDurations.forEach((duration) =>
      params.append("duration", duration)
    );
    selectedBelongsTo.forEach((belongTo) =>
      params.append("belongTo", belongTo)
    );

    navigate({ search: params.toString() });
  }, [
    query,
    selectedCategories,
    selectedLevels,
    selectedDurations,
    selectedBelongsTo,
    navigate,
  ]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParams = queryParams.getAll("category");
    const levelParams = queryParams.getAll("level");
    const durationParams = queryParams.getAll("duration");
    const belongToParams = queryParams.getAll("belongTo");
    const queryParam = queryParams.get("query");

    if (categoryParams.length) setSelectedCategories(categoryParams);
    if (levelParams.length) setSelectedLevels(levelParams);
    if (durationParams.length) setSelectedDurations(durationParams);
    if (belongToParams.length) setSelectedBelongsTo(belongToParams);
    if (queryParam) setQuery(queryParam);
  }, [location.search]);

  const handleFilterChange = (setFilter, filterList, value) => {
    let newFilterList;
    if (filterList.includes(value)) {
      newFilterList = filterList.filter((item) => item !== value);
    } else {
      newFilterList = [...filterList, value];
    }
    setFilter(newFilterList);
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    updateURL();
  }, [
    query,
    selectedCategories,
    selectedLevels,
    selectedDurations,
    selectedBelongsTo,
    updateURL,
  ]);

  const filteredCourses = coursesList.filter((course) => {
    const categoryMatch = selectedCategories.length
      ? selectedCategories.includes(course.category?.name)
      : true;
    const levelMatch = selectedLevels.length
      ? selectedLevels.includes(course.level)
      : true;
    const durationMatch = selectedDurations.length
      ? selectedDurations.includes(course.expectedDuration)
      : true;
    const belongToMatch = selectedBelongsTo.length
      ? selectedBelongsTo.includes(course.belongTo)
      : true;

    const queryMatch = query
      ? course.title?.toLowerCase().includes(query.toLowerCase()) ||
        course.institution?.toLowerCase().includes(query.toLowerCase()) ||
        course.expectedDuration?.toLowerCase().includes(query.toLowerCase()) ||
        course.category?.name.toLowerCase().includes(query.toLowerCase()) ||
        course.description?.toLowerCase().includes(query.toLowerCase())
      : true;

    return (
      categoryMatch &&
      levelMatch &&
      durationMatch &&
      belongToMatch &&
      queryMatch
    );
  });

  const coursesPerPage = 10;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const displayedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="BrowseCourse">
      <div
        className="filtersSection"
        style={{
          left: mobileFiltetMode ? "0px" : "-100%",
        }}
      >
        <h3>
          <span>Filter</span>
          {width < 600 && (
            <X onClick={() => setmobileFiltetMode(!mobileFiltetMode)} />
          )}
        </h3>
        <p>Categories</p>
        <div className="optionsdiv">
          {categoriesList.map((category) => (
            <span key={category._id}>
              <input
                type="checkbox"
                id={category._id}
                checked={selectedCategories.includes(category.name)}
                onChange={() =>
                  handleFilterChange(
                    setSelectedCategories,
                    selectedCategories,
                    category.name
                  )
                }
              />
              <label htmlFor={category._id}>
                {category.name} ({category.numCourses})
              </label>
            </span>
          ))}
        </div>
        <p>Level</p>
        <div className="optionsdiv">
          {["Beginner", "Intermediate", "Advance"].map((level) => (
            <span key={level}>
              <input
                type="checkbox"
                id={level}
                checked={selectedLevels.includes(level)}
                onChange={() =>
                  handleFilterChange(setSelectedLevels, selectedLevels, level)
                }
              />
              <label htmlFor={level}>{level}</label>
            </span>
          ))}
        </div>

        <p>Duration</p>
        <div className="optionsdiv">
          {[
            "1-4 weeks",
            "1-4 months",
            "4-8 months",
            "8-12 months",
            "1-2 years",
          ].map((duration, index) => (
            <span key={index}>
              <input
                type="checkbox"
                id={duration}
                checked={selectedDurations.includes(duration)}
                onChange={() =>
                  handleFilterChange(
                    setSelectedDurations,
                    selectedDurations,
                    duration
                  )
                }
              />
              <label htmlFor={duration}>{duration}</label>
            </span>
          ))}
        </div>
        <p>Belongs To</p>
        <div className="optionsdiv">
          {[
            "For Individuals",
            "For Corporates",
            "For Universities",
            "For Governments",
          ].map((belong, index) => (
            <span key={index}>
              <input
                type="checkbox"
                id={belong}
                checked={selectedBelongsTo.includes(belong)}
                onChange={() =>
                  handleFilterChange(
                    setSelectedBelongsTo,
                    selectedBelongsTo,
                    belong
                  )
                }
              />
              <label htmlFor={belong}>{belong}</label>
            </span>
          ))}
        </div>
      </div>
      <div className="courseList">
        {width < 600 && (
          <button
            onClick={() => {
              setmobileFiltetMode(!mobileFiltetMode);
            }}
          >
            <SlidersHorizontal size={18} />
            Filter
          </button>
        )}
        <h3>{filteredCourses.length} Results</h3>
        <div>
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course) => (
              <OneCourseCard key={course._id} course={course} />
            ))
          ) : (
            <p>No courses match the selected filters.</p>
          )}
        </div>
        {filteredCourses.length > coursesPerPage && (
          <div className="pagination">
            <button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowseCourse;
