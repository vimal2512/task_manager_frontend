// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import AuthContext from "../context/AuthContext.js";
// import { isAdmin } from "../utils/auth.js";

// const AdminUsers = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (!user || !isAdmin(user)) {
//       navigate("/dashboard"); // Redirect non-admins
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/users", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [navigate, user]);

//   const updateRole = async (userId, newRole) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/users/${userId}`,
//         { role: newRole },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );
//       setUsers((prevUsers) =>
//         prevUsers.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
//       );
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Admin Panel - Manage Users</h2>
//       <table className="w-full border mt-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Role</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id} className="border">
//               <td className="border p-2">{u.name}</td>
//               <td className="border p-2">{u.email}</td>
//               <td className="border p-2">{u.role}</td>
//               <td className="border p-2">
//                 {u.role !== "admin" ? (
//                   <button
//                     onClick={() => updateRole(u._id, "admin")}
//                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                   >
//                     Make Admin
//                   </button>
//                 ) : (
//                   <span className="text-gray-500">Admin</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUsers;

// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext.js";
// import { isAdmin } from "../utils/auth.js";
// import api from "../utils/axiosInstance.js";

// const AdminUsers = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user || !isAdmin(user)) {
//       navigate("/dashboard");
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         const response = await api.get("/users");
//         setUsers(response.data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to fetch users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [navigate, user]);

//   const updateRole = async (userId, newRole) => {
//     try {
//       await api.put(`/users/${userId}`, { role: newRole });
//       setUsers((prev) =>
//         prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
//       );
//     } catch (err) {
//       console.error("Error updating role:", err);
//       alert("Could not update role.");
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold">Admin Panel - Manage Users</h2>

//       {loading ? (
//         <p>Loading users...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <table className="w-full border mt-4">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Role</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((u) => (
//               <tr key={u._id} className="border">
//                 <td className="border p-2">{u.name}</td>
//                 <td className="border p-2">{u.email}</td>
//                 <td className="border p-2">{u.role}</td>
//                 <td className="border p-2">
//                   {u.role !== "admin" ? (
//                     <button
//                       onClick={() => updateRole(u._id, "admin")}
//                       className="bg-blue-500 text-white px-2 py-1 rounded"
//                     >
//                       Make Admin
//                     </button>
//                   ) : (
//                     <span className="text-gray-500">Admin</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;


import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
import { isAdmin } from "../utils/auth.js";
import api from "../utils/axiosInstance.js";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Don't redirect until user context is resolved
    if (user === undefined) return;

    if (!user || !isAdmin(user)) {
      navigate("/dashboard");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, user]);

  if (!user || loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin Panel - Manage Users</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>
                <td className="border p-2">
                  {u.role !== "admin" ? (
                    <button
                      onClick={() => updateRole(u._id, "admin")}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-gray-500">Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  async function updateRole(userId, newRole) {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Could not update role.");
    }
  }
};

export default AdminUsers;
