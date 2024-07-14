import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the Auth context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
    role: "",
    profilePhoto: "",
    id: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

  const fetchMyData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setisLoading(false);
    }
  };
  const UpdatehMyData = async (mydata) => {
    setisLoading(true);
    try {
      await axios.put(`${apiBaseUrl}/user`, mydata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return "success";
    } catch (error) {
      console.error("Failed to Update user data", error);
      return "failed";
    } finally {
      setisLoading(false);
    }
  };

  const SetProfilPhoto = async (file) => {
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/upload/userprofile`,
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
  const fetchUserData = async (token) => {
    setisLoading(true);
    try {
      const response = await axios.get(`${apiBaseUrl}/fetch/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser({
        isLoggedIn: true,
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        profilePhoto: response.data.profilePhotoUrl,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
      logout();
    } finally {
      setisLoading(false);
    }
  };

  const login = async (email, password, role) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/${role}/login`, {
        email,
        password,
      });
      console.log(response.data.token);

      // Add a delay before setting token to localStorage
      setTimeout(() => {
        try {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } catch (error) {
          console.error("Error saving token to localStorage:", error);
        }
      }, 100); // Adjust delay time as needed
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const signin = async (name, email, password, contactNumber, role) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/${role}/register`, {
        name,
        email,
        contactNumber,
        password,
      });
      if (role === "student") {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      }
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const sendOTP = async (email, newUser) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/sendOTP`, {
        email,
        newUser,
      });
      setisLoading(false);
      return response.status;
    } catch (error) {
      console.error("Failed to send OTP", error);
      setisLoading(false);
      return error.response.status;
    }
  };

  const checkOTP = async (email, otp) => {
    setisLoading(true);
    try {
      await axios.post(`${apiBaseUrl}/auth/checkOTP`, {
        email,
        otp,
      });
      setisLoading(false);
      return true;
    } catch (error) {
      console.error("Failed to verify OTP", error);
      setisLoading(false);
      return false;
    }
  };
  const updatePassword = async (email, newPassword) => {
    setisLoading(true);
    try {
      await axios.put(`${apiBaseUrl}/auth/updatePassword`, {
        email,
        newPassword,
      });
      setisLoading(false);
      return true;
    } catch (error) {
      console.error("Failed to update password", error);
      setisLoading(false);
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser({
      isLoggedIn: false,
      name: "",
      email: "",
      role: "",
      profilePhoto: "",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signin,
        logout,
        isLoading,
        setisLoading,
        fetchMyData,
        UpdatehMyData,
        SetProfilPhoto,
        sendOTP,
        checkOTP,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
