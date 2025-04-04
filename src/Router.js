// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminUsers from "./pages/AdminUsers.js";

// // Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" replace />;
// };

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route redirects to login */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/tasks/:id"
//           element={
//             <ProtectedRoute>
//               <TaskDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/users"
//           element={
//             <ProtectedRoute>
//               <AdminUsers />
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 Page */}
//         <Route
//           path="*"
//           element={
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//               <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminUsers from "./pages/AdminUsers.js";

// // Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("accessToken"); // ✅ fixed token key
//   return token ? children : <Navigate to="/login" replace />;
// };

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
//         <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

//         <Route path="*" element={
//           <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>
//           </div>
//         }/>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminUsers from "./pages/AdminUsers.js";
// import Navbar from "./components/Navbar.js";
// import { ThemeProvider } from "./context/ThemeContext.js";

// // Protected Route Wrapper
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("accessToken");
//   return token ? children : <Navigate to="/login" replace />;
// };

// const AppRouter = () => {
//   return (
//     <ThemeProvider>
//       <Router>
//         <div className="min-h-screen bg-white dark:bg-gray-900">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" replace />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
//             <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />

//             <Route path="*" element={
//               <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
//                 <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">404 - Page Not Found</h1>
//               </div>
//             } />
//           </Routes>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default AppRouter;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminUsers from "./pages/AdminUsers.js";
// import Navbar from "./components/Navbar.js";
// import { ThemeProvider } from "./context/ThemeContext.js";
// import { AuthProvider } from "./context/AuthContext.js";
// import ProtectedRoute from "./components/ProtectedRoute.js";
// import AdminPanel from "./pages/AdminPanel.js"; // Add this line


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
//             <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
//             <Route path="*" element={<h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>} />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// };

// export default AppRouter;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.js";
import TaskDetails from "./pages/TaskDetails.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import AdminUsers from "./pages/AdminUsers.js";
import AdminPanel from "./pages/AdminPanel.js"; // ✅ Import AdminPanel
import Navbar from "./components/Navbar.js";
import { ThemeProvider } from "./context/ThemeContext.js";
import { AuthProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

const AppRouter = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />

            {/* ✅ New Admin Panel route */}
            <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />

            <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />
            <Route path="*" element={<h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppRouter;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./pages/Dashboard.js";
// import TaskDetails from "./pages/TaskDetails.js";
// import Login from "./pages/Login.js";
// import Register from "./pages/Register.js";
// import AdminPanel from "./pages/AdminPanel.js";
// import AdminUsers from "./pages/AdminUsers.js";
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

//             {/* Admin Routes */}
//             <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>} />
//             <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />

//             {/* 404 Page */}
//             <Route path="*" element={<h1 className="text-center text-red-500 mt-20 text-3xl">404 - Not Found</h1>} />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </AuthProvider>
//   );
// };

// export default AppRouter;
