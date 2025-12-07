import React, { useEffect, useState } from "react";
import { getTables, getMenu, reserveTable,createOrder } from "../api";
import { ShoppingCart, Users, Clock, CheckCircle, XCircle, Plus } from "lucide-react";

const CustomerDashboard = () => {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [reservedTable, setReservedTable] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchMenu();
    fetchTables();

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const interval = setInterval(fetchTables, 8000);
    return () => clearInterval(interval);
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getMenu();
      if (data) setMenu(data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const fetchTables = async () => {
    try {
      const data = await getTables();
      if (data) setTables(data);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  const handleAddToCart = (item) => {
    const index = cart.findIndex((i) => i.id === item.id);
    let updatedCart = [...cart];

    if (index !== -1) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowCart(true);
    setTimeout(() => setShowCart(false), 2000);
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleReserveTable = async (table) => {
  if (table.status !== "available") return alert("This table is already booked!");
  if (cart.length === 0) return alert("Please add items to your cart first!");

  const userName = prompt("Your Name:");
  const phone = prompt("Your Phone Number:");
  if (!userName || !phone) return;

  try {
    // 1️⃣ Reserve table
    const res = await reserveTable({
      table_id: table.id,
      user_name: userName.trim(),
      phone: phone.trim(),
    });
    if (res.error) return alert(res.error);

    // 2️⃣ Create order for the cart
    const orderRes = await createOrder({
      table_id: table.id,
      items: cart, // your cart already has items
    });
    if (orderRes.error) return alert(orderRes.error);

    alert(res.message || "Table reserved & order created successfully!");

    setReservedTable(table);
    setTables(prev =>
      prev.map(t => t.id === table.id ? { ...t, status: "reserved" } : t)
    );

    setCart([]);
    localStorage.removeItem("cart");
  } catch (err) {
    console.error(err);
    alert("Failed to reserve table or create order. Please try again.");
  }
};

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-orange-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            Welcome to FoodieHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">Order food & reserve your table — all in one place</p>
        </div>

        {/* Floating Cart Button */}
        {totalItems > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full p-5 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-3"
            >
              <ShoppingCart className="w-8 h-8" />
              <span className="absolute -top-3 -right-3 bg-white text-red-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-lg">
                {totalItems}
              </span>
            </button>
          </div>
        )}

        {/* Cart Toast */}
        {showCart && totalItems > 0 && (
          <div className="fixed bottom-28 right-8 bg-white rounded-2xl shadow-2xl p-6 border-2 border-red-100 max-w-sm z-40 animate-slide-up">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-red-600" />
              Your Cart ({totalItems} items)
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="ml-2 text-gray-500">x{item.quantity || 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    <button
                      onClick={() => handleDecrement(i)}
                      className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleIncrement(i)}
                      className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-red-600">Our Menu</span>
            </h2>
            <p className="text-gray-600">Fresh • Authentic • Delicious</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {menu.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image ? `http://localhost:5000/uploads/${item.image}` : "/placeholder-food.jpg"}
                    alt={item.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">Rs. {item.price}</span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tables Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Users className="w-10 h-10 text-red-600" />
              Available Tables
            </h2>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Updates every 8 seconds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tables.map((table) => {
              const isAvailable = table.status === "available";
              const canBook = isAvailable && cart.length > 0;

              return (
                <div
                  key={table.id}
                  className={`rounded-3xl shadow-xl p-8 text-center transition-all duration-500 ${
                    isAvailable
                      ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-2xl hover:scale-105"
                      : "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 opacity-80"
                  }`}
                >
                  <div className="mb-6">
                    {isAvailable ? (
                      <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
                    ) : (
                      <XCircle className="w-16 h-16 mx-auto text-red-600" />
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{table.name}</h3>
                  <p className="text-lg text-gray-700 mb-4">Up to {table.capacity} people</p>

                  <div className="mb-6">
                    <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${
                      isAvailable
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}>
                      {isAvailable ? "Available" : "Booked"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleReserveTable(table)}
                    disabled={!canBook}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                      canBook
                        ? "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-xl transform hover:scale-105"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {canBook ? "Reserve This Table" : isAvailable ? "Add items first" : "Already Booked"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CustomerDashboard;
