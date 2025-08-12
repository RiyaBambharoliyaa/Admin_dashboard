// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false, children }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!user || !token) return <Navigate to="/login" />;
  if (adminOnly && !(user.role === "admin" || user.role === "super-admin")) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedRoute;
