import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Forbidden</h1>
      <p className="mb-4 text-lg">You don’t have permission to access this page.</p>
      <Link to="/dashboard" className="text-blue-600 underline">
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default Forbidden;
