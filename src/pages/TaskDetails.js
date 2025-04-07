import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance.js";
import AuthContext from "../context/AuthContext";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const trimmedId = id?.trim();
        if (!trimmedId || trimmedId.length !== 24) {
          throw new Error("Invalid Task ID");
        }

        console.log("Fetching Task from:", `/tasks/${trimmedId}`);
        const response = await api.get(`/tasks/${trimmedId}`);
        setTask(response.data);
      } catch (err) {
        console.error("Failed to fetch task:", err.message);
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
      await api.delete(`/tasks/${id.trim()}`);
      alert("Task deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(" Error deleting task:", err.message);
      setError("Error deleting task. Please try again.");
    }
  };

  const isOwnerOrAdmin = user?.role === "admin" || user?._id === task?.createdBy;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading task details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        {error}
        <br />
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{task.name}</h2>

        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {task.description || "No description"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Status:</strong>{" "}
          <span className="font-semibold">{task.status}</span>
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Priority:</strong> {task.priority || "N/A"}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Assigned To:</strong> {task.assignedTo?.name || "Unassigned"}
        </p>

        <div className="text-gray-500 text-sm mt-4">
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
          {task.completedAt && (
            <p>
              <strong>Completed At:</strong>{" "}
              {new Date(task.completedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Back
          </button>

          {isOwnerOrAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/tasks/${id}/edit`)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
