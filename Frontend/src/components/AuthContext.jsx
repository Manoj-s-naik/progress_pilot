import React, { useContext, useState, createContext } from "react";

const authContex = createContext();

export function useAuth() {
  return useContext(authContex);
}

function AuthWrapper({ children }) {
  const [login, setLogin] = useState(false);

  const loginHandler = () => {
    setLogin(true);
  };

  const logoutHandler = () => {
    setLogin(false);
  };

  return (
    <authContex.Provider value={{ login, loginHandler, logoutHandler }}>
      {children}
    </authContex.Provider>
  );
}

export default AuthWrapper;
