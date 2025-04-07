import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/admin")}
            className="block w-full text-left hover:underline"
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="block w-full text-left hover:underline"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="block w-full text-left hover:underline"
          >
            Back to App
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-700">
          Use the navigation on the left to manage users and view system details.
        </p>
      </main>
    </div>
  );
};

export default AdminPanel;
