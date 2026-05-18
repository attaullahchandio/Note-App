import { Children, createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  // Register
  const register = async (name, email, password) => {
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      return res.data;
    } catch (error) {
      throw err.response?.data?.message || "Register failed";
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

    // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

    // LOAD ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, token, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
