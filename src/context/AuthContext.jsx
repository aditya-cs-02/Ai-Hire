import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import apiClient from '../api/apiClient';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (accessToken && storedUser) {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            await logout(); // Token expired, log out
          } else {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          await logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      await apiClient.post("/users/logout", { refreshToken });
      
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      await logout();
      return;
    }

    try {
      const response = await apiClient.post("/users/refresh-token", {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch (error) {
      console.error("Token refresh failed:", error);
      await logout();
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            await refreshToken();
            accessToken = localStorage.getItem("accessToken");
          }
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};