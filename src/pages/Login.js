import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = res.data;

      if (accessToken && refreshToken && user) {
        login(user, accessToken, refreshToken);
        navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      } else {
        setError("Login failed: Incomplete response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded mb-3 bg-white text-black dark:bg-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4 bg-white text-black dark:bg-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        type="submit"
        className="w-full p-2 rounded text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Login
      </button>
      <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default Login;