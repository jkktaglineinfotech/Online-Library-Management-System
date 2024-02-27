import React, { createContext, useEffect, useState } from "react";
import { signIn } from "../apis/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: "",
  };
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo });

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setAuthInfo({ ...authInfo, isPending: true });
      const { data, message } = await signIn(email, password);
      console.log("handleLogin", data);

      if (message === "Login Successful.") {
        setAuthInfo({
          profile: { ...data },
          isPending: false,
          isLoggedIn: true,
          error: "",
        });
        localStorage.setItem("role", data.role);
        localStorage.setItem("auth-token", data.accessToken);
        if (data.role === "ADMIN") {
          navigate("/admin/home");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
      return setAuthInfo({ ...authInfo, isPending: false, error: error });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    navigate("/home");
    setAuthInfo({ ...defaultAuthInfo });
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return navigate("/home");
  }, []);

  return (
    <AuthContext.Provider value={{ authInfo, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
