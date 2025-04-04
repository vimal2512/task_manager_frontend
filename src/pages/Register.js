import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
      const response = await api.post("http://localhost:5000/api/auth/register", userData);
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleChange}
        value={userData.name}
        className="w-full p-2 border mb-3"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={userData.email}
        className="w-full p-2 border mb-3"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={userData.password}
        className="w-full p-2 border mb-4"
        required
      />
      <button
        type="submit"
        className={`w-full p-2 text-white ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
