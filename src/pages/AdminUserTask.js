import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axiosInstance";

const AdminUserTasks = () => {
  const { id } = useParams(); // user ID
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get(`/admin/users/${id}/tasks`);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks by User</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white border p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-medium">{task.name}</p>
                <p className="text-gray-500 text-sm">{task.description}</p>
              </div>
              <Link
                to={`/tasks/${task._id}`}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                View / Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUserTasks;
