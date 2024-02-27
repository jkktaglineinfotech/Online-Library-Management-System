// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

import { useSelector } from "react-redux";

// export const useAuth = () => useContext(AuthContext);

export const useAuthToken = () => {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  return userInfo.accessToken;
};

export const useAdmin = () => {
    const { userInfo } = useSelector((state) => state.userRegisterLogin);
    return userInfo.role === "ADMIN";
  };
  