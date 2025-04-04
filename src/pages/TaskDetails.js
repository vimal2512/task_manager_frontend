import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js"; // Update path as needed

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        setError("Failed to fetch task details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      alert("Task deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError("Error deleting task. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading task details...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        {error} <br />
        <button onClick={() => navigate("/dashboard")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{task.name}</h2>
        <p className="text-gray-600 mb-2"><strong>Description:</strong> {task.description}</p>
        <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className="font-semibold">{task.status}</span></p>
        <p className="text-gray-500 text-sm"><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>

        <div className="mt-4 flex justify-between">
          <button onClick={() => navigate("/dashboard")} className="bg-gray-500 text-white px-4 py-2 rounded">
            Back
          </button>
          <button onClick={() => navigate(`/edit-task/${id}`)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
