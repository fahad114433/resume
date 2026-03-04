import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create New Resume", path: "/dashboard/create" },
    { name: "My Resume", path: "/dashboard/resume" },
    { name: "Templates", path: "/dashboard/templates" },
  ];

  return (
    <div className="flex min-h-screen bg-purple-50">

      {/* ================= Sidebar ================= */}
      <div className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <h2 className="text-3xl font-bold text-purple-600 mb-10 text-center">
          ElevateCV
        </h2>

        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button at bottom */}
        <div className="mt-auto pt-6">
          <button
            onClick={() => {
              logout();
              navigate("/"); // clean navigate
            }}
            className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= Main Content ================= */}
      <div className="flex-1 p-8">

        {/* Top Right Profile Box */}
        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-lg border border-purple-100">
            <span className="font-medium text-gray-700">{user?.name || "User"}</span>
          </div>
        </div>

        {/* Main Outlet */}
        <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[70vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;