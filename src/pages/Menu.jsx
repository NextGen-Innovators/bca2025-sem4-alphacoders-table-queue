import React, { useEffect, useState } from "react";
import { getTables, createOrder, getMenu } from "../api";
import { ShoppingCart, Plus, Minus, X, AlertCircle } from "lucide-react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]); // { dish, quantity }
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });

    fetchMenu();
    fetchTables();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data || []);
    } catch (err) {
      alert("Failed to load menu. Please try again.");
    }
  };

  const fetchTables = async () => {
    try {
      const data = await getTables();
      setTables(data || []);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  // Add or increase item in cart
  const addToCart = (dish) => {
    if (!user) {
      alert("Please login to order food");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.dish.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Update quantity
  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.dish.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Calculate total
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    if (!tableId) return alert("Please select a table first");
    if (cart.length === 0) return alert("Your cart is empty");

    setLoading(true);
    try {
      const items = cart.map(({ dish, quantity }) => ({
        name: dish.name,
        price: dish.price,
        quantity,
      }));

      const res = await createOrder({
        table_id: tableId,
        items: JSON.stringify(items),
        total_amount: totalPrice,
        status: "pending",
      });

      alert(
        res.message || "Order placed successfully! Your food is being prepared"
      );
      setCart([]);
      setTableId("");
      setIsCartOpen(false);
    } catch (err) {
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-32">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-red-700 mb-4">
            Our Delicious Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh, authentic Nepali & international flavors — made with love
          </p>
        </div>

        {/* Table Selection - Fixed Top */}
        {!user ? (
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex items-center gap-3 text-yellow-800">
              <AlertCircle className="w-6 h-6" />
              <p className="font-medium">Please login to place an order</p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Choose Your Table
              </label>
              <select
                value={tableId}
                onChange={(e) => setTableId(e.target.value)}
                className="w-full md:w-96 px-5 py-4 rounded-xl border-2 border-gray-300 focus:border-red-500 focus:outline-none text-lg transition"
              >
                <option value="">Select a table</option>
                {tables
                  .filter((t) => t.status === "available")
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} → Capacity: {t.capacity} people
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {menuItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">
                Loading delicious items...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {menuItems.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        dish.image
                          ? `http://localhost:5000/uploads/${dish.image}`
                          : "/placeholder-food.jpg"
                      }
                      alt={dish.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {dish.name}
                    </h3>
                    {dish.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {dish.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        Rs. {dish.price}
                      </span>
                      <button
                        onClick={() => addToCart(dish)}
                        className="bg-red-600 text-white px-5 py-3 rounded-full font-medium hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition flex items-center gap-2"
                      >
                        <Plus className="w-5 h-5" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full p-5 shadow-2xl hover:bg-red-700 hover:scale-110 transition z-40 flex items-center gap-3"
          >
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </button>
        )}

        {/* Cart Drawer */}
        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8 text-red-600" />
                  Your Order ({cart.reduce((s, i) => s + i.quantity, 0)} items)
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 h-full overflow-y-auto pb-32">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-10">
                    Cart is empty
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.dish.id}
                        className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4"
                      >
                        <img
                          src={
                            item.dish.image
                              ? `http://localhost:5000/uploads/${item.dish.image}`
                              : "/placeholder.png"
                          }
                          alt={item.dish.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.dish.name}</h4>
                          <p className="text-red-600 font-bold">
                            Rs. {item.dish.price} × {item.quantity} = Rs.{" "}
                            {item.dish.price * item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.dish.id, -1)}
                            className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.dish.id, 1)}
                            className="w-9 h-9 rounded-full bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Footer */}
              {cart.length > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-6">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total</span>
                    <span className="text-red-600">Rs. {totalPrice}</span>
                  </div>
                  <button
                    onClick={handleOrder}
                    disabled={loading || !tableId}
                    className={`w-full py-5 rounded-full font-bold text-white text-lg transition ${
                      tableId && !loading
                        ? "bg-red-600 hover:bg-red-700 shadow-xl"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Placing Order..." : "Confirm & Order"}
                  </button>
                  {!tableId && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Please select a table first
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
