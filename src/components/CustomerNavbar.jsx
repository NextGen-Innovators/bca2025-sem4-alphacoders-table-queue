import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { 
  Home, 
  ShoppingCart, 
  History, 
  Clock, 
  User, 
  LogOut, 
  Menu as MenuIcon, 
  X 
} from "lucide-react";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Safely get username from JWT
  let username = "User";
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.name || decoded.email?.split("@")[0] || "User";
    } catch (err) {
      username = "User";
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  };

  const navLinks = [
    { to: "/customer/dashboard", label: "Home", icon: <Home className="w-5 h-5" /> },
    { to: "/customer/dashboard/cart", label: "Cart", icon: <ShoppingCart className="w-5 h-5" /> },
    { to: "/customer/dashboard/orderhistory", label: "Order History", icon: <History className="w-5 h-5" /> },
    // { to: "/customer/dashboard/orderqueue", label: "Order Queue", icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/customer/dashboard" 
              className="text-3xl font-extrabold tracking-tight hover:text-orange-100 transition"
            >
              FoodieHub
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-white/20 transition-all duration-200 font-medium"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - User & Logout */}
          <div className="flex items-center gap-4">
            {/* User Greeting */}
            <div className="hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">Hi, {username}!</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-2 bg-red-700 hover:bg-red-800 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-red-700/95 backdrop-blur-lg border-t border-white/20">
          <div className="px-4 py-6 space-y-4">
            {/* User Greeting Mobile */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl">
              <User className="w-6 h-6" />
              <span className="font-bold text-lg">Hi, {username}!</span>
            </div>

            {/* Mobile Links */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-white/20 transition text-lg font-medium"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-800 hover:bg-red-900 px-6 py-4 rounded-xl font-bold text-lg transition shadow-lg"
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

export default CustomerNavbar;