import axios from "axios";

export const fetchInstructors = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/fetch/users/teacher/all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching instructors:", error);
    throw error;
  }
};
export const fetchCourses = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/courses/all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/categories/all`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/courses/${courseId}`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const fetchCourse = async (courseId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/courses/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Course:", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  const uploadData = new FormData();
  uploadData.append("image", file);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/upload`,
      uploadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("There was an error uploading the file!", error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/courses/create`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};