import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const AdminOverview = () => {
  const [stats, setStats] = useState({ users: 0, tasks: 0, pending: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await api.get("/admin/users/count");
        const tasksRes = await api.get("/admin/tasks/count");
        const pendingRes = await api.get("/admin/tasks/pending/count");

        setStats({
          users: usersRes.data.count || 0,
          tasks: tasksRes.data.count || 0,
          pending: pendingRes.data.count || 0,
        });
      } catch (err) {
        console.error("Failed to load admin overview stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Admin Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-gray-500 dark:text-gray-300">Total Users</p>
            <h3 className="text-2xl font-semibold">{stats.users}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-gray-500 dark:text-gray-300">Total Tasks</p>
            <h3 className="text-2xl font-semibold">{stats.tasks}</h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <p className="text-gray-500 dark:text-gray-300">Pending Tasks</p>
            <h3 className="text-2xl font-semibold">{stats.pending}</h3>
          </div>
        </div>

        <div className="space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/admin/users")}
          >
            Manage Users
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => navigate("/dashboard")} // 👈 Updated route
          >
            Manage Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
