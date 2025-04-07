import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await api.get("/users/profile");
        const profile = profileRes.data;
        setUser(profile);
        setName(profile.name || "");
        setEmail(profile.email || "");
        localStorage.setItem("user", JSON.stringify(profile));
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        logout();
        navigate("/login");
        return;
      }

      try {
        const tasksRes = await api.get("/tasks/user/assigned");
        setTasks(tasksRes.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, setUser, logout]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${user._id}`, { name, email });
      alert("Profile updated!");
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user || loading) {
    return (
      <p className="text-gray-800 dark:text-gray-200 p-6">Loading user data...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="mb-6">
          <p className="text-lg mb-2">
            Welcome, <span className="font-bold">{user.name}</span> ({user.email})
          </p>

          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Your Tasks</h3>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-300 dark:border-gray-600 p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-700"
                >
                  <h4 className="font-bold text-lg">{task.title}</h4>
                  <p className="text-sm">{task.description}</p>
                  <p className="text-sm mt-1">
                    Status:{" "}
                    <span className="text-sm font-medium capitalize">{task.status}</span>
                  </p>

                  <div className="mt-2 space-x-4">
                    <Link
                      to={`/tasks/${task._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to={`/tasks/${task._id}/edit`}
                        className="text-green-500 hover:underline"
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
