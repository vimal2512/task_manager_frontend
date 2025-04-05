// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminUsers from "./pages/AdminUsers.js";
// import AdminPanel from "./pages/AdminPanel.js"; 
// import Navbar from "./components/Navbar.js";
// import { ThemeProvider } from "./context/ThemeContext.js";
// import { AuthProvider } from "./context/AuthContext.js";
// import ProtectedRoute from "./components/ProtectedRoute.js";

// const AppRouter = () => {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" replace />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />

//             {/* New Admin Panel route */}
//             <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />

//             <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
//             <Route path="*" element={<h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>} />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// };

// export default AppRouter;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
// import TaskDetails from "./pages/TaskDetails";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminUsers from "./pages/AdminUsers";
// import AdminPanel from "./pages/AdminPanel";
// import Forbidden from "./pages/Forbidden"; //
// import Navbar from "./components/Navbar";

// import { ThemeProvider } from "./context/ThemeContext";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";

// const AppRouter = () => {
//   return (
//     <AuthProvider>
//       <ThemeProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" replace />} />

//             {/* Public Routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/tasks/:id"
//               element={
//                 <ProtectedRoute>
//                   <TaskDetails />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Admin Routes */}
//             <Route
//               path="/admin/dashboard"
//               element={
//                 <ProtectedRoute adminOnly={true}>
//                   <AdminPanel />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/users"
//               element={
//                 <ProtectedRoute adminOnly={true}>
//                   <AdminUsers />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Error Handling Routes */}
//             <Route path="/403" element={<Forbidden />} />
//             <Route
//               path="*"
//               element={
//                 <h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>
//               }
//             />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// };

// export default AppRouter;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminPanel from "./pages/AdminPanel";
import Forbidden from "./pages/Forbidden";
import Navbar from "./components/Navbar";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRouter = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* Error & Fallback Routes */}
            <Route path="/403" element={<Forbidden />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppRouter;
