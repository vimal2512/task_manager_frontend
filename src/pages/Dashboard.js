import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(" Checking accessToken in Local Storage:", token);

    if (!token) {
      console.warn(" No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    // Fetch user profile data
    api
      .get("/users/profile")
      .then((res) => {
        console.log(" Authenticated API Call Success:", res.data);
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error(" API Call Failed:", err.response?.data);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      });
  }, [navigate]); // Added `navigate` as a dependency

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/users/${user._id}`, { name, email });
      alert(" Profile updated!");
      setUser(data);
    } catch (err) {
      console.error(" Update failed:", err);
      alert("Update failed.");
    }
  };

  if (!user) {
    return <p>Loading user data...</p>; // You can show a loading spinner here if needed
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <div>
          <p className="text-lg mb-4">
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

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
