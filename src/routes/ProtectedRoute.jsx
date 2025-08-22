// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false,userOnly=false, children }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!user || !token) return <Navigate to="/login" />;
  if (adminOnly && !(user.role === "admin" || user.role === "super-admin")) {
    return <Navigate to="/unothorizes" />;
  }

  if (userOnly && (user.role === "admin" || user.role === "super-admin")) {
    return <Navigate to="/unothorizes" />;
  }


  return children;
};

export default ProtectedRoute;
