// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);

  if (!user || !user.Id) {
    return <Navigate to="/login" />;
  }

  return children;
};


