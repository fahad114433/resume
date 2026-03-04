import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger icons

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Templates", path: "/templates" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT - LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl sm:text-4xl font-bold text-purple-600 cursor-pointer"
        >
          ElevateCV
        </h1>

        {/* CENTER - DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-purple-600 ${isActive ? "text-purple-600 font-semibold" : ""}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT - DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 sm:px-6 py-2 rounded-full bg-purple-600 text-white text-sm sm:text-lg font-semibold shadow-lg hover:bg-purple-700 hover:scale-105 transition duration-300"
          >
            Get Started Free
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 sm:px-6 py-2 rounded-full bg-purple-600 text-white text-sm sm:text-lg font-semibold shadow-lg hover:bg-purple-700 hover:scale-105 transition duration-300"
          >
            Create Your Resume
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX className="w-6 h-6 text-purple-600" /> : <HiMenu className="w-6 h-6 text-purple-600" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-gray-700 font-medium py-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 ${
                  isActive ? "text-purple-600 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => { navigate("/login"); setIsOpen(false); }}
              className="w-full px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Get Started Free
            </button>
            <button
              onClick={() => { navigate("/register"); setIsOpen(false); }}
              className="w-full px-4 py-2 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Create Your Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}