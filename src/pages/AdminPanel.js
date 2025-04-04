import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          navigate("/login");
          return;
        }

        const profileRes = await api.get("/users/profile");
        if (profileRes.data.role !== "admin") {
          navigate("/dashboard");
          return;
        }

        const usersRes = await api.get("/admin/users");
        setUsers(usersRes.data);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

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
        <h2 className="text-3xl font-bold mb-4">User Management</h2>

        {loading ? (
          <p className="text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">Username</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="border px-3 py-2">{user.name}</td>
                    <td className="border px-3 py-2">{user.email}</td>
                    <td className="border px-3 py-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
