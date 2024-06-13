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
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token]);

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

  const signin = async (name, email, password, role) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/${role}/register`, {
        name,
        email,
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
      value={{ user, login, signin, logout, isLoading, setisLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
