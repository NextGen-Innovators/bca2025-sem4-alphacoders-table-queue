import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getRole } from "./utils/auth";

// Navbars
import Navbar from "./components/Navbar";
import CustomerNavbar from "./components/CustomerNavbar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerHistory from "./pages/customer/CustomerHistory";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Sync token whenever localStorage changes
  useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    syncToken(); // run once on mount

    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const role = token ? getRole() : null;

  return (
    <>
      {role === "customer" ? <CustomerNavbar /> : <Navbar />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />

          {/* pass setToken */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          <Route path="/register" element={<Register />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/dashboard/cart" element={<CustomerCart />} />
          <Route path="/customer/dashboard/orderhistory" element={<CustomerHistory />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
