// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../context/AuthContext.js";

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date"); // Default sorting by date

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/tasks", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [navigate, user]);

//   // Filter tasks based on status
//   const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

//   // Sort tasks based on the selected criteria
//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === "date") {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     } else if (sortBy === "status") {
//       return a.status.localeCompare(b.status);
//     }
//     return 0;
//   });

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Dashboard</h2>
//       <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded float-right">
//         Logout
//       </button>

//       {/* Filters */}
//       <div className="my-4">
//         <label className="mr-2">Filter by Status:</label>
//         <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2">
//           <option value="all">All</option>
//           <option value="Pending">Pending</option>
//           <option value="Completed">Completed</option>
//         </select>
//       </div>

//       {/* Sorting */}
//       <div className="my-4">
//         <label className="mr-2">Sort by:</label>
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2">
//           <option value="date">Date</option>
//           <option value="status">Status</option>
//         </select>
//       </div>

//       {/* Task Table */}
//       <table className="w-full border mt-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Title</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Created At</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedTasks.length > 0 ? (
//             sortedTasks.map((task) => (
//               <tr key={task.id} className="border">
//                 <td className="border p-2">{task.title}</td>
//                 <td className="border p-2">{task.status}</td>
//                 <td className="border p-2">{new Date(task.createdAt).toLocaleDateString()}</td>
//                 <td className="border p-2">
//                   <button onClick={() => navigate(`/tasks/${task.id}`)} className="bg-blue-500 text-white px-2 py-1 rounded">
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center p-4">
//                 No tasks found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../context/AuthContext.js";

// const Dashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date"); // Default sorting by date

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/tasks", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, [navigate, user]);

//   // Filter tasks based on status
//   const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter);

//   // Sort tasks based on the selected criteria
//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === "date") {
//       return new Date(a.createdAt) - new Date(b.createdAt);
//     } else if (sortBy === "status") {
//       return a.status.localeCompare(b.status);
//     }
//     return 0;
//   });

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
//           <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
//             Logout
//           </button>
//         </div>

//         {/* Filters & Sorting */}
//         <div className="flex justify-between mb-4">
//           <div>
//             <label className="mr-2 font-medium text-gray-700">Filter by Status:</label>
//             <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
//               <option value="all">All</option>
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//           </div>

//           <div>
//             <label className="mr-2 font-medium text-gray-700">Sort by:</label>
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
//               <option value="date">Date</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
//         </div>

//         {/* Task Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border bg-white shadow-sm rounded-lg">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="border p-3 text-left">Title</th>
//                 <th className="border p-3 text-left">Status</th>
//                 <th className="border p-3 text-left">Created At</th>
//                 <th className="border p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedTasks.length > 0 ? (
//                 sortedTasks.map((task) => (
//                   <tr key={task.id} className="border hover:bg-gray-100 transition">
//                     <td className="border p-3">{task.title}</td>
//                     <td className="border p-3">
//                       <span
//                         className={`px-2 py-1 rounded text-white ${
//                           task.status === "Completed" ? "bg-green-500" : "bg-yellow-500"
//                         }`}
//                       >
//                         {task.status}
//                       </span>
//                     </td>
//                     <td className="border p-3">{new Date(task.createdAt).toLocaleDateString()}</td>
//                     <td className="border p-3">
//                       <button
//                         onClick={() => navigate(`/tasks/${task.id}`)}
//                         className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-6 text-gray-500">
//                     No tasks found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js"; // Import Axios instance

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("🔍 Token in Local Storage:", token);

//     if (!token) {
//       console.warn("❌ No token found! Redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     api.get("/users/profile")
//       .then(res => {
//         console.log("✅ Authenticated API Call Success:", res.data);
//         setUser(res.data);
//       })
//       .catch(err => {
//         console.error("❌ API Call Failed:", err.response?.data);
//         navigate("/login"); // Redirect if unauthorized
//       });
//   }, []);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
//         {user ? (
//           <p className="text-lg">
//             Welcome, <span className="font-bold">{user.name}</span> ({user.email})
//           </p>
//         ) : (
//           <p className="text-gray-500">Loading user data...</p>
//         )}
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/login");
//           }}
//           className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js"; // Import Axios instance

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken"); // Ensure correct token key
//     console.log("🔍 Checking accessToken in Local Storage:", token);

//     if (!token) {
//       console.warn("❌ No token found! Redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     api
//       .get("/users/profile")
//       .then((res) => {
//         console.log("✅ Authenticated API Call Success:", res.data);
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.error("❌ API Call Failed:", err.response?.data);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         navigate("/login"); // Redirect if unauthorized
//       });
//   }, [navigate]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
//         {user ? (
//           <p className="text-lg">
//             Welcome, <span className="font-bold">{user.name}</span> ({user.email})
//           </p>
//         ) : (
//           <p className="text-gray-500">Loading user data...</p>
//         )}
//         <button
//           onClick={() => {
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken"); // Clear refresh token too
//             navigate("/login");
//           }}
//           className="mt-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     console.log("🔍 Checking accessToken in Local Storage:", token);

//     if (!token) {
//       console.warn("❌ No token found! Redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     api.get("/users/profile")
//       .then((res) => {
//         console.log("✅ Authenticated API Call Success:", res.data);
//         setUser(res.data);
//       })
//       .catch((err) => {
//         console.error("❌ API Call Failed:", err.response?.data);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         navigate("/login");
//       });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     navigate("/login");
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.put(`/users/${user._id}`, user);
//       alert("✅ Profile updated!");
//       setUser(data);
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       alert("❌ Update failed.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

//         {user ? (
//           <div>
//             <p className="text-lg mb-4">
//               Welcome, <span className="font-bold">{user.name}</span> ({user.email})
//             </p>

//             <form onSubmit={handleUpdate} className="space-y-3">
//               <input
//                 value={user.name}
//                 onChange={(e) => setUser({ ...user, name: e.target.value })}
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 value={user.email}
//                 onChange={(e) => setUser({ ...user, email: e.target.value })}
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         ) : (
//           <p className="text-gray-500">Loading user data...</p>
//         )}

//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     console.log("🔍 Checking accessToken in Local Storage:", token);

//     if (!token) {
//       console.warn("❌ No token found! Redirecting to login...");
//       navigate("/login");
//       return;
//     }

//     api
//       .get("/users/profile")
//       .then((res) => {
//         console.log("✅ Authenticated API Call Success:", res.data);
//         setUser(res.data);
//         setName(res.data.name);
//         setEmail(res.data.email);
//       })
//       .catch((err) => {
//         console.error("❌ API Call Failed:", err.response?.data);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         navigate("/login");
//       });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     navigate("/login");
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.put(`/users/${user._id}`, { name, email });
//       alert("✅ Profile updated!");
//       setUser(data);
//     } catch (err) {
//       console.error("❌ Update failed:", err);
//       alert("❌ Update failed.");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

//         {user ? (
//           <div>
//             <p className="text-lg mb-4">
//               Welcome, <span className="font-bold">{user.name}</span> ({user.email})
//             </p>

//             <form onSubmit={handleUpdate} className="space-y-3">
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your name"
//               />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border px-3 py-2 rounded"
//                 placeholder="Enter your email"
//               />
//               <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Update Profile
//               </button>
//             </form>
//           </div>
//         ) : (
//           <p className="text-gray-500">Loading user data...</p>
//         )}

//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

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
    console.log("🔍 Checking accessToken in Local Storage:", token);

    if (!token) {
      console.warn("❌ No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    // Fetch user profile data
    api
      .get("/users/profile")
      .then((res) => {
        console.log("✅ Authenticated API Call Success:", res.data);
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error("❌ API Call Failed:", err.response?.data);
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
      alert("✅ Profile updated!");
      setUser(data);
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("❌ Update failed.");
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
