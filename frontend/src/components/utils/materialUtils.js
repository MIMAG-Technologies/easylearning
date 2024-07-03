import axios from "axios";

export const createMaterial = async (materialData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/material`,
      materialData,
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
export const updateMaterial = async (materialData, materialId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/material/${materialId}`,
      materialData,
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
export const fetchMaterial = async (materialId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/material/${materialId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};
