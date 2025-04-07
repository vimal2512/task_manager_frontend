// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ThemeContext from "../context/ThemeContext.js";

// const Navbar = () => {
//   const { darkMode, toggleTheme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
//       <h1 className="text-xl font-bold dark:text-white text-gray-900">Task Manager</h1>

//       <div className="flex items-center space-x-4">
//         <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:underline">
//           Dashboard
//         </Link>
//         <Link to="/admin/users" className="text-gray-800 dark:text-gray-200 hover:underline">
//           Admin
//         </Link>
//         <button
//           onClick={toggleTheme}
//           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//         >
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import ThemeContext from "../context/ThemeContext.js";
// import AuthContext from "../context/AuthContext.js";

// const Navbar = () => {
//   const { darkMode, toggleTheme } = useContext(ThemeContext);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
//       <h1 className="text-xl font-bold dark:text-white text-gray-900">Task Manager</h1>

//       <div className="flex items-center space-x-4">
//         <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:underline">
//           Dashboard
//         </Link>

//         {user?.role === "admin" && (
//           <Link to="/admin/users" className="text-gray-800 dark:text-gray-200 hover:underline">
//             Admin
//           </Link>
//         )}

//         <button
//           onClick={toggleTheme}
//           aria-label="Toggle theme"
//           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
//         >
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>

//         <button
//           onClick={handleLogout}
//           aria-label="Logout"
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold dark:text-white text-gray-900">Task Manager</h1>

      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="text-gray-800 dark:text-gray-200 hover:underline">
          Dashboard
        </Link>
        <Link to="/admin/users" className="text-gray-800 dark:text-gray-200 hover:underline">
          Admin
        </Link>
        <button
          onClick={toggleTheme}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
