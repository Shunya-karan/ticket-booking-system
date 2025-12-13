import { createContext, useContext, useState, useEffect } from "react";
import {
  getTokenFromLS,
  storeTokenInLS,
  removeTokenFromLS
} from "../utils/authtokens";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const savedToken = getTokenFromLS();
    const savedUser = localStorage.getItem("authUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);

    storeTokenInLS(tokenValue);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    removeTokenFromLS();
    localStorage.removeItem("authUser");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading,
        isLoggedIn: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
