import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance.js";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    // Fetch user profile
    api
      .get("/users/profile")
      .then((res) => {
        setUser(res.data); 
        localStorage.setItem("user", JSON.stringify(res.data)); 
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error("API Call Failed:", err.response?.data);
        logout(); // Clear everything and redirect
        navigate("/login");
      });

    // Fetch tasks
    api
      .get("/tasks/user/assigned")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks:", err);
      });
  }, [navigate, setUser, logout]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${user._id}`, { name, email });
      alert("Profile updated!");
      setUser(data.user); // res returns { message, user }
      localStorage.setItem("user", JSON.stringify(data.user)); // sync again
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed.");
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="mb-6">
          <p className="text-lg mb-2">
            Welcome, <span className="font-bold">{user.name}</span> ({user.email})
          </p>

          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
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
                  className="border p-4 rounded shadow-sm bg-gray-50"
                >
                  <h4 className="font-bold">{task.name}</h4>
                  <p>{task.description}</p>
                  <p>
                    Status:{" "}
                    <span className="text-sm font-medium">{task.status}</span>
                  </p>

                  <div className="mt-2 space-x-4">
                    <Link
                      to={`/task/${task._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </Link>

                    {user.isAdmin && (
                      <Link
                        to={`/tasks/${task._id}/edit`}
                        className="text-green-600 hover:underline"
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

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
