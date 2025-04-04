// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, adminOnly = false }) => {

//   const user = JSON.parse(localStorage.getItem("user")); // Get user data

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (adminOnly && user.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   let user = null;

//   try {
//     const storedUser = localStorage.getItem("user");
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch (err) {
//     console.error("❌ Failed to parse user from localStorage:", err);
//     user = null;
//   }

//   // 🔐 Not logged in
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🚫 Restricted for non-admin users
//   if (adminOnly && user.role !== "admin") {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // ✅ All good
//   return children;
// };

// export default ProtectedRoute;


import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
