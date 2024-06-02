import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { fetchCourses, fetchCategories } from "../components/utils/courseUtils";

export const ResoursesContext = createContext();

export const ResoursesProvider = ({ children }) => {
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

  const fetchCategoriesData = async () => {
    setisLoading(true);
    try {
      const data = await fetchCategories();
      setCategoriesList(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
    fetchCoursesData();
  }, []);

  return (
    <ResoursesContext.Provider value={{ categoriesList, coursesList }}>
      {children}
    </ResoursesContext.Provider>
  );
};
