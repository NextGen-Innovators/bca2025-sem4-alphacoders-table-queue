import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = ({ setToken }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);              // ✅ force re-render
    navigate("/login");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="w-full bg-gray-800 text-white fixed top-0 left-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <div className="text-2xl font-bold text-red-500">
          <Link to="/admin/dashboard">AdminHub</Link>
        </div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/menu">Menu</Link></li>
          <li><Link to="/admin/table">table</Link></li>
          
        </ul>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-gray-800 p-6 space-y-4">
          <Link onClick={closeMenu} to="/admin/dashboard">Dashboard</Link>
          <Link onClick={closeMenu} to="/admin/menu">Menu</Link>
          
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
