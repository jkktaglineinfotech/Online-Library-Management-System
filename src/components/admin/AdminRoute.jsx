import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = ({ admin }) => {
  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
