import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { HiMenu, HiX } from "react-icons/hi";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create New Resume", path: "/dashboard/create" },
    { name: "My Resume", path: "/dashboard/resume" },
    { name: "Templates", path: "/dashboard/templates" },
  ];

  return (
    <div className="flex min-h-screen bg-purple-50">

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="bg-white w-64 h-full shadow-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-purple-600">ElevateCV</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <HiX className="w-6 h-6 text-purple-600" />
            </button>
          </div>

          <nav className="flex-1 space-y-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
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

          <div className="mt-auto pt-6">
            <button
              onClick={() => {
                logout();
                navigate("/");
                setSidebarOpen(false);
              }}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex w-64 bg-white shadow-xl p-6 flex-col">
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

        <div className="mt-auto pt-6">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE TOP BAR */}
        <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <HiMenu className="w-6 h-6 text-purple-600" />
          </button>
          <h2 className="text-xl font-bold text-purple-600">ElevateCV</h2>
          <div className="w-6 h-6"></div>
        </div>

        {/* TOP PROFILE DESKTOP */}
        <div className="hidden md:flex justify-end items-center p-6">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-lg border border-purple-100">
            <span className="font-medium text-gray-700">{user?.name || "User"}</span>
          </div>
        </div>

        {/* OUTLET */}
        <div className="flex-1 p-6 md:p-8 bg-purple-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[60vh]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;