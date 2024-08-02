import React, { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // const navigate = useNavigate();

  const fetchUserData = async () => {
    let userId = localStorage.getItem("user");
    let jwtCookie = document.cookie.split("=")[0];

    if (userId && jwtCookie) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/users/${userId}`,
          { withCredentials: true }
        );

        setUser(response.data.data.data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const signup = async (name, email, password, passwordConfirm) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/signup",
        { name, email, password, passwordConfirm },
        { withCredentials: true }
      );

      Cookies.set("jwt", response.data.token);
      localStorage.setItem("user", response.data.data._id);

      setIsLoggedIn(true);
      setUser(response.data.data);
      showAlert("Sign-up successful!");
    } catch (error) {
      console.error("There was an error signing up!", error);
      showAlert("Failed to sign up. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      Cookies.set("jwt", response.data.token);
      localStorage.setItem("user", response.data.data._id);

      setIsLoggedIn(true);
      setUser(response.data.data);
      showAlert("Login successful!");
    } catch (error) {
      console.error("There was an error logging in!", error);
      showAlert("Failed to log in. Please check your email and password.");
    }
  };
  const logout = () => {
    // Set the cookie to a null value and expire it in 2 seconds
    Cookies.set("jwt", "loggedout", {
      expires: new Date(Date.now() + 2 * 1000), // 2 seconds
      path: "/",
      secure: process.env.NODE_ENV === "production", // Use true in production
      sameSite: "None",
    });
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    showAlert("Logged out successfully.");
    // navigate("/"); // Redirect to the home page
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage("");
    }, 3000); // Alert disappears after 3 seconds
  };

  return (
    <AuthContext.Provider
      value={{
        fetchUserData,
        isLoggedIn,
        user,
        error,
        login,
        logout,
        signup,
        alertMessage,
        setAlertMessage,
        showAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
