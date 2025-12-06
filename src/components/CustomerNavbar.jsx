import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CustomerNavbar = () => {
  const navigate = useNavigate();

  // Safely get username from JWT (best practice)
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
    localStorage.removeItem("username"); // optional if you still use it
    navigate("/login");
    window.location.reload(); // ensures navbar switches back
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/customer/dashboard" className="text-2xl font-bold hover:text-gray-200">
              FoodieHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/customer/dashboard/cart" className="hover:text-gray-200">cart</Link>
            <Link to="/customer/dashboard/orderhistory" className="hover:text-gray-200">order history</Link>
            <Link to="/customer/dasboard/orderqueue" className="hover:text-gray-200">Order Queue</Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-semibold">Hi, {username}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;