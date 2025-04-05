
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log(" handleLogin triggered");
    e.preventDefault();
    setError("");

    try {
      console.log(" Attempting login with:", { email, password });

      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = res.data;

      if (accessToken && refreshToken && user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful for:", user.role);

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        console.error(" Missing data in login response");
        setError("Login failed: Incomplete response from server.");
      }
    } catch (err) {
      console.error(" Login Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
