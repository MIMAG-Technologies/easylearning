import axios from "axios";

export const createModule = async (moduleData, courseId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/modules/create/${courseId}`,
      moduleData,
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
export const fetchModule = async (CourseId, ModuleId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/modules/${CourseId}/${ModuleId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const UpdateModule = async (module, ModuleId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/modules/${ModuleId}`,
      module,
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
export const DeleteModule = async (ModuleId) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/modules/${ModuleId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return 200;
  } catch (error) {
    console.error("Error creating course:", error);
    throw 400;
  }
};
