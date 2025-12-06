import React, { useState } from "react";
import { Menu, X, LayoutDashboard, Utensils, Table, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = ({ setToken }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To highlight active link

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/menu", label: "Menu", icon: Utensils },
    { to: "/admin/table", label: "Tables", icon: Table },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-2xl">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link
              to="/admin/dashboard"
              className="text-3xl font-extrabold text-white tracking-wide flex items-center gap-3 hover:opacity-90 transition"
              onClick={closeMenu}
            >
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                AdminHub
              </span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`
                      flex items-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300
                      ${isActive(to)
                        ? "bg-white text-red-600 shadow-lg scale-105"
                        : "text-white hover:bg-white/20 hover:scale-105"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                </li>
              ))}

              {/* Logout Button - Desktop */}
              <li className="ml-4">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-6 py-4 bg-red-800 hover:bg-red-900 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-gradient-to-b from-red-700 to-orange-700 border-t border-white/20">
          <div className="px-6 py-6 space-y-3">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMenu}
                className={`
                  flex items-center gap- gap-4 px-6 py-4 rounded-xl text-lg font-semibold transition-all
                  ${isActive(to)
                    ? "bg-white text-red-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                  }
                `}
              >
                <Icon className="w-6 h-6" />
                {label}
              </Link>
            ))}

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-red-800 hover:bg-red-900 text-white rounded-xl font-bold shadow-lg transition-all hover:scale-105"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;