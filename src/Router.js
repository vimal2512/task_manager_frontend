import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import AdminPanel from "./pages/AdminPanel";
import AdminOverview from "./pages/AdminOverview";
import AdminUserTasks from "./pages/AdminUserTask";
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
            {/* Redirect root to register */}
            <Route path="/" element={<Navigate to="/register" replace />} />

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
                <ProtectedRoute adminOnly={true}>
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminOverview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id/tasks"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUserTasks />
                </ProtectedRoute>
              }
            />

            {/* Error Routes */}
            <Route path="/403" element={<Forbidden />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-red-500 mt-20 text-3xl">
                  404 - Not Found
                </h1>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppRouter;
