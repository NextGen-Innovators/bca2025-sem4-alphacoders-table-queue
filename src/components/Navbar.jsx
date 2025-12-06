import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check localStorage for token and decode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // decoded contains {id, role}
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin/dashboard");
    else if (user.role === "customer") navigate("/customer/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-2xl font-bold text-red-500"
        >
          FoodieHub
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/" onClick={() => setOpen(false)} className="hover:text-red-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setOpen(false)} className="hover:text-red-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={() => setOpen(false)} className="hover:text-red-500">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/reservation" onClick={() => setOpen(false)} className="hover:text-red-500">
              Reservation
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-red-500">
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold hover:bg-red-600 transition"
              >
                {user.role === "admin" ? "A" : "C"}
              </button>
              <button
                onClick={handleLogout}
                className="ml-2 text-gray-500 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg p-6 space-y-4 text-gray-700 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/reservation" onClick={() => setOpen(false)}>Reservation</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

          <div className="pt-4 border-t">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full block text-center border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white mb-4"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full block text-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleProfileClick}
                  className="w-full block text-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mb-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full block text-center border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
