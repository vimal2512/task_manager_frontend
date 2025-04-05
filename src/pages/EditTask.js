// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance"; // Adjust the path as needed

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await api.get(`/tasks/${id}`);
//         setTask(response.data);
//       } catch (error) {
//         setError("Failed to fetch task.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTask();
//   }, [id]);

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.put(`/tasks/${id}`, task);
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Failed to update task.");
//     }
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading task details...</p>;

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Edit Task</h2>

//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="title"
//             value={task.title}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Task Title"
//             required
//           />

//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Task Description"
//             required
//           ></textarea>

//           <label className="block mb-2">Status:</label>
//           <select
//             name="status"
//             value={task.status}
//             onChange={handleChange}
//             className="w-full p-2 mb-4 border rounded"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Update Task
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="w-full bg-gray-500 text-white p-2 rounded mt-2"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTask;

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js";
// import { AuthContext } from "../context/AuthContext.js"; // adjust path as needed

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { userInfo } = useContext(AuthContext);

//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     status: "Pending",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ⛔ Redirect if not admin
//   useEffect(() => {
//     if (!userInfo || !userInfo.isAdmin) {
//       navigate("/dashboard");
//     }
//   }, [userInfo, navigate]);

//   // 📝 Fetch task details
//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await api.get(`/tasks/${id}`);
//         setTask(response.data);
//       } catch (error) {
//         setError("Failed to fetch task.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTask();
//   }, [id]);

//   // 📌 Handle input changes
//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   // ✅ Submit task update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await api.put(`/tasks/${id}`, task);
//       navigate("/dashboard");
//     } catch (error) {
//       setError("Failed to update task.");
//     }
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading task details...</p>;

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Edit Task</h2>

//         {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="title"
//             value={task.title}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Task Title"
//             required
//           />

//           <textarea
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 border rounded"
//             placeholder="Task Description"
//             required
//           ></textarea>

//           <label className="block mb-2 font-medium">Status:</label>
//           <select
//             name="status"
//             value={task.status}
//             onChange={handleChange}
//             className="w-full p-2 mb-4 border rounded"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>

//           <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//             Update Task
//           </button>

//           <button
//             type="button"
//             onClick={() => navigate("/dashboard")}
//             className="w-full bg-gray-500 text-white p-2 rounded mt-2"
//           >
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditTask;

// src/pages/EditTask.js

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";
import { AuthContext } from "../context/AuthContext.js"; // ✅ Corrected import

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ use user not userInfo

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⛔ Redirect if not admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // 📝 Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        setError("Failed to fetch task.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/tasks/${id}`, task);
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to update task.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading task details...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Task</h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Task Title"
            required
          />

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded"
            placeholder="Task Description"
            required
          ></textarea>

          <label className="block mb-2 font-medium">Status:</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Update Task
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-500 text-white p-2 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
