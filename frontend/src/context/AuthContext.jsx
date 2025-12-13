import { createContext, useContext, useState, useEffect } from "react";
import { getTokenFromLS, storeTokenInLS, removeTokenFromLS } from "../utils/authtokens";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getTokenFromLS());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 NEW

  // Load user from localStorage when app loads
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = (tokenValue, userData) => {
    // Store in state
    setToken(tokenValue);
    setUser(userData);

    // Store in localStorage
    storeTokenInLS(tokenValue);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };


  const logout = () => {
    removeTokenFromLS();
    localStorage.removeItem("authUser");

    setToken(null);
    setUser(null);
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
