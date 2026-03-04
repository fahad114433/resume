import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Templates", path: "/templates" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-purple-600 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* LOGO */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>
            ElevateCV
          </h1>

          {/* LINKS */}
          <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base justify-center">
            {links.map((link) => (
              <span
                key={link.name}
                className="hover:text-purple-200 cursor-pointer"
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </span>
            ))}
          </div>

          {/* Designed by */}
          <div className="text-sm sm:text-base text-purple-200 text-center md:text-right">
            Designed by <span className="text-white font-medium">Muhammad Fahad</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-purple-400 mt-6 pt-4 text-center text-purple-200 text-xs sm:text-sm">
          © {new Date().getFullYear()} ElevateCV. All rights reserved.
        </div>
      </div>
    </footer>
  );
}