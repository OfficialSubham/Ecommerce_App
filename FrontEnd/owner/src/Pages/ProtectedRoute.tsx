import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Use react-router-dom, not just react-router
import Loading from "../utils/Loading";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = still checking

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Still checking authentication
  if (isAuthenticated === null) {
    return <Loading/>; // or return null;
  }

  // Authenticated? Go ahead
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
