import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { isAdmin } from "../utils/auth";
import api from "../utils/axiosInstance";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user === undefined) return;

    if (!user || !isAdmin(user)) {
      navigate("/dashboard");
      return;
    }
    console.log("Fetched users:", users);

    const fetchUsers = async () => {
      try {
        const response = await api.get("admin/users");
        console.log("Raw users data from API:", response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, user]);

  async function updateRole(userId, newRole) {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Could not update role.");
    }
  }

  if (!user || loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
    
      <h2 className="text-2xl font-bold">Admin Panel - Manage Users</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              
              <tr key={u._id} className="border">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2 space-x-2">
                  {/* ⚠ Replace this taskId with dynamic value later */}
                  <button
                    onClick={() => navigate(`/tasks/${u.taskId}`)}  
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    View Task
                  </button>

                  {u.role !== "admin" ? (
                    <button
                      onClick={() => updateRole(u._id, "admin")}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-gray-500">Admin</span>
                  )}
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;