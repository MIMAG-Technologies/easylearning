import Collaborations from "./Sections/Collaborations";
import ExploreCategories from "./Sections/ExploreCategories";
import LandingPage from "./Sections/LandingPage";
import NewCourses from "./Sections/NewCourses";
import OutCome from "./Sections/OutCome";
import Testimonials from "./Sections/Testimonials";
import "./Home.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { fetchCourses } from "../utils/courseUtils";

function Home() {
  const [categoriesList, setCategoriesList] = useState([]);
  const { setisLoading } = useContext(AuthContext);
  const [coursesList, setCoursesList] = useState([]);

  const fetchCoursesData = async () => {
    try {
      const data = await fetchCourses();
      setCoursesList(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const fetchCategories = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/categories/all"
      );
      setCategoriesList(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchCoursesData();
  }, []);
  return (
    <>
      <LandingPage />
      <Collaborations />
      <NewCourses coursesList={coursesList} />
      <ExploreCategories categoriesList={categoriesList} />
      <OutCome />
      <Testimonials />
    </>
  );
}

export default Home;
