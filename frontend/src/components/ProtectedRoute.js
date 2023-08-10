import React from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  // Check user token here
  const jwt = Cookies.get("jwt");
  if (!jwt) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
