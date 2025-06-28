// src/auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const lsUser  = JSON.parse(localStorage.getItem("user"));
    const lsToken = localStorage.getItem("token");
    if (lsUser && lsToken) setUser(lsUser);
  }, []);

  const login = (u, token) => {
    localStorage.setItem("user", JSON.stringify(u));
    localStorage.setItem("token", token);
    setUser(u);
    nav("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    nav("/login");
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
