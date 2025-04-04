// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
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
//       const user = JSON.parse(localStorage.getItem("user"));
//       await axios.put(`http://localhost:5000/api/tasks/${id}`, task, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
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

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../utils/axiosInstance.js"; // Replaces raw axios

// const EditTask = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const response = await api.get(`/tasks/${id}`);
//         setTask(response.data);
//       } catch (error) {
//         console.error("Fetch error:", error);
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
//     setSubmitting(true);

//     try {
//       await api.put(`/tasks/${id}`, task);
//       navigate("/dashboard"); // or navigate(-1) to go back
//     } catch (error) {
//       console.error("Update error:", error.response?.data || error.message);
//       setError("Failed to update task.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading task details...</p>;

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Edit Task</h2>

//         {error && <p className="text-red-500 mb-2">{error}</p>}

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

//           <button
//             type="submit"
//             disabled={submitting}
//             className={`w-full ${
//               submitting ? "bg-blue-300" : "bg-blue-500"
//             } text-white p-2 rounded`}
//           >
//             {submitting ? "Updating..." : "Update Task"}
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


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance"; // Adjust the path as needed

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", status: "Pending" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        {error && <p className="text-red-500">{error}</p>}

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

          <label className="block mb-2">Status:</label>
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

