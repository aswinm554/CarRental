import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear any stored admin login data
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/owner");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Dashboard</h1>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="text-left px-3 py-2 rounded hover:bg-blue-600"
          >
            Dashboard Home
          </button>

          <button
            onClick={() => navigate("/admin-dashboard/cars")}
            className="text-left px-3 py-2 rounded hover:bg-blue-600"
          >
            Manage Cars
          </button>

          <button
            onClick={() => navigate("/admin-dashboard/bookings")}
            className="text-left px-3 py-2 rounded hover:bg-blue-600"
          >
            Manage Bookings
          </button>

          <button
            onClick={handleLogout}
            className="mt-auto bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-white"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-6">Welcome, Admin 👋</h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-medium">Total Cars</h3>
           
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-medium">Total Bookings</h3>
           
           
          </div>

          <div className="bg-white shadow rounded-xl p-6 text-center">
            <h3 className="text-xl font-medium">Active Users</h3>
           
           
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
