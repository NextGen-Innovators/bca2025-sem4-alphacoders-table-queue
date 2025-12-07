import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getRole } from "./utils/auth";

// Navbars
import Navbar from "./components/Navbar";
import CustomerNavbar from "./components/CustomerNavbar";
import AdminNavbar from "./components/AdminNavbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./admin/AdminMenu";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerHistory from "./pages/customer/CustomerHistory";
import AdminTable from "./admin/AdminTable";
import AdminOrders from "./admin/AdminOrders";
import AdminReservations from "./admin/AdminReservations";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    syncToken();

    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const role = token ? getRole() : null;

  // ✅ UPDATED: pass setToken to AdminNavbar
  const renderNavbar = () => {
    if (role === "admin") return <AdminNavbar setToken={setToken} />;
    if (role === "customer") return <CustomerNavbar />;
    return <Navbar />;
  };

  return (
    <>
      {renderNavbar()}

      <div className="pt-20">
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />

          {/* Admin pages */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/table" element={<AdminTable />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/reservations" element={<AdminReservations />} />

          {/* Customer pages */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/dashboard/cart" element={<CustomerCart />} />
          <Route path="/customer/dashboard/orderhistory" element={<CustomerHistory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
