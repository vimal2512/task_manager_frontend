import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance.js";
import AuthContext from "../context/AuthContext.js";

const Register = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", userData);
      const { user, accessToken, refreshToken } = response.data;

      if (accessToken) {
        login(user, accessToken, refreshToken);
        navigate("/dashboard");
      } else {
        throw new Error("Missing token after register");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        value={userData.name}
        className="w-full p-2 border rounded mb-3 bg-white text-black dark:bg-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={userData.email}
        className="w-full p-2 border rounded mb-3 bg-white text-black dark:bg-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={userData.password}
        className="w-full p-2 border rounded mb-4 bg-white text-black dark:bg-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        required
      />
      <button
        type="submit"
        className={`w-full p-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Register;
