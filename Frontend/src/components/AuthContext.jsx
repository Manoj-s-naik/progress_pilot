import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [login, setLogin] = useState(false);
  const [progressScore, setprogressScore] = useState(100);
  const loginHandler = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setLogin(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
      });
      const data = response.json();
      setLogin(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  
  return (
    <AuthContext.Provider value={{ login, loginHandler,progressScore,setprogressScore, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
