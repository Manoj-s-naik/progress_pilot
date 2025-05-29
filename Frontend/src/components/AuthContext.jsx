import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [login, setLogin] = useState(false);

  const [progressScore, setprogressScore] = useState(0);

  const loginHandler = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setLogin(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
      });
      const data =await response.json();
      setLogin(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getLoggedInUserInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/loggedinUser",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error.message);
      return null; // Return null or an error object to handle errors gracefully
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        loginHandler,
        progressScore,
        setprogressScore,
        logoutHandler,
        getLoggedInUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
