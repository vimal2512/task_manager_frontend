// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js"; // Ensure this is correctly configured

// const Register = () => {
//   const [userData, setUserData] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.post("http://localhost:5000/api/auth/register", userData); // ✅ Fixed API Call
//       console.log("🟢 Server Response:", response.data);
//       const{accessToken,refreshToken} = response.data;
//       if(accessToken){
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         console.log("✅ Tokens saved in localStorage")
//       }else{
//         console.log("access token is missing in response")
//       }
//       if (response.status === 201) {
//         navigate("/dashboard"); // ✅ Redirect After Registration
//       }
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

//         {error && (
//           <p aria-live="polite" className="text-red-600 bg-red-100 p-2 rounded mb-2 text-center">
//             {error}
//           </p>
//         )}

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={userData.name}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={userData.email}
//           onChange={handleChange}
//           className="w-full p-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={userData.password}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />

//         <button
//           type="submit"
//           className={`w-full text-white p-2 rounded transition ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>

//         <p className="mt-3 text-center">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

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

// src/pages/Register.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:4000/api/register", user);
//       const token = response.data.token;

//       if (token) {
//         localStorage.setItem("accessToken", token);
//         console.log("✅ Token stored:", token);
//         navigate("/dashboard");
//       } else {
//         console.log("❌ Token not received");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             type="text"
//             onChange={handleChange}
//             value={user.username}
//             placeholder="Username"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             value={user.email}
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             value={user.password}
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-purple-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     console.log("Before update:", user); // Debug: log current state
//     console.log("Updating:", e.target.name, e.target.value); // Debug: log change
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting:", user); // Debug: log form data
//     try {
//       const response = await axios.post("http://localhost:4000/api/register", user);
//       const token = response.data.token;
//       if (token) {
//         localStorage.setItem("accessToken", token);
//         console.log("✅ Token stored:", token);
//         navigate("/dashboard");
//       } else {
//         console.log("❌ Token not received");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             type="text"
//             onChange={handleChange}
//             value={user.username}
//             placeholder="Username"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             value={user.email}
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             value={user.password}
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-purple-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     console.log("Before update:", user); // Debug: log current state
//     console.log("Updating:", e.target.name, e.target.value); // Debug: log change
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(user.email)) {
//       alert("Please enter a valid email address");
//       return false;
//     }

//     if (user.password.length < 6) {
//       alert("Password must be at least 6 characters long");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     console.log("Submitting:", user); // Debug: log form data
//     try {
//       const response = await axios.post("http://localhost:5000/api/register", user);
//       const token = response.data.token;
//       if (token) {
//         localStorage.setItem("accessToken", token);
//         console.log("✅ Token stored:", token);
//         setUser({ username: "", email: "", password: "" }); // Reset form after submission
//         navigate("/dashboard");
//       } else {
//         console.log("❌ Token not received");
//       }
//     } catch (err) {
//       console.error("Registration error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
//       <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             type="text"
//             onChange={handleChange}
//             value={user.username}
//             placeholder="Username"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="email"
//             type="email"
//             onChange={handleChange}
//             value={user.email}
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <input
//             name="password"
//             type="password"
//             onChange={handleChange}
//             value={user.password}
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
//             disabled={loading}
//           >
//             {loading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-purple-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
