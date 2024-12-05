import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { encrypt } from "../components/utils/cryptoUtils";

// Create the Auth context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoading, setisLoading] = useState(false);
  const {
    isAuthenticated,
    user: auth0User,
    isLoading: auth0IsLoading,
    logout: auth0Logout,
  } = useAuth0();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("userData");
    return userData
      ? JSON.parse(userData)
      : {
          isLoggedIn: false,
          name: "",
          email: "",
          contactNumber: "",
          role: "",
          profilePhoto: "",
          id: "",
          address: {
            appartmentNo: "",
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
          },
        };
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [cart, setCart] = useState(() => {
    const cartData = localStorage.getItem("UserCart");
    return cartData ? JSON.parse(cartData) : [];
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);
  useEffect(() => {
    localStorage.setItem("UserCart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const handleOAuthLogin = async () => {
    try {
      const encryptionKey = import.meta.env.VITE_DECRYPTION_KEY;

      // Validate if user data exists
      if (!auth0User || !auth0User.name || !auth0User.email) {
        throw new Error("Invalid user data provided.");
      }

      const data = { name: auth0User.name, email: auth0User.email };

      // Encrypt user data
      const encryptedData = encrypt(JSON.stringify(data), encryptionKey);

      // Send encrypted data to the backend
      const res = await axios.post(`${apiBaseUrl}/auth/googleLogin`, {
        encryptedData,
      });

      const token = res.data.token;

      // Save token and fetch user info
      localStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      console.error("OAuth login failed:", error.message);
    }
  };

  const checkAuthentication = async () => {
    if (!auth0IsLoading && isAuthenticated && auth0User) {
      await handleOAuthLogin();
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated, auth0IsLoading, auth0User]);

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
        address: response.data.address,
        contactNumber: response.data.contactNumber,
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
      logout();
    } finally {
      setisLoading(false);
    }
  };

  const login = async (email, password, role) => {
    setisLoading(true);
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/${role}/login`, {
        email,
        password,
      });

      // Add a delay before setting token to localStorage
      setTimeout(() => {
        try {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } catch (error) {
          console.error("Error saving token to localStorage:", error);
        }
      }, 100); // Adjust delay time as needed
      setisLoading(false);
      return 200;
    } catch (error) {
      console.error("Failed to login", error);
      setisLoading(false);
      return 500;
    }
  };

  const signin = async (name, email, password, contactNumber, role) => {
    setisLoading(true);
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
      setisLoading(false);
      return 200;
    } catch (error) {
      console.error("Failed to sign in", error);
      setisLoading(false);
      return 500;
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
    auth0Logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signin,
        logout,
        setToken,
        isLoading,
        setisLoading,
        fetchMyData,
        UpdatehMyData,
        SetProfilPhoto,
        sendOTP,
        checkOTP,
        updatePassword,
        cart,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
