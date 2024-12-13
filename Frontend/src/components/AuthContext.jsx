import React, { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({ children }) {
  const [login, setLogin] = useState(false);

  const loginHandler = async (email, password) => {
    // const dummyLoginCredintial = {
    //   email: "naik47236@gamil.com",
    //   password: "7676manoj",
    // };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLogin(true);
      console.log("data", data);
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
      console.log("data in logout", data);

      setLogin(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, loginHandler, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthWrapper;
