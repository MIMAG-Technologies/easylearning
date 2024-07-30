import axios from "axios";

export const initiateTransaction = async (userId, courseId, amount) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/transaction/initiate`,
      { userId, courseId, amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { token: res.data.token, status: 200 };
  } catch (error) {
    if (error.response.data.message === "Enter valid address") {
      return { status: 400 };
    } else if (
      error.response.data.message === "User is already enrolled in this course"
    ) {
      return { status: 401 };
    } else {
      return { status: 500 };
    }
  }
};
