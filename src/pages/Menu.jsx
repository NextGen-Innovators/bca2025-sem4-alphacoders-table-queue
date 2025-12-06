import React, { useEffect, useState } from "react";
import { getTables, createOrder, getMenu } from "../api";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState([]);
  const [user, setUser] = useState(null); // check login

  useEffect(() => {
    fetchMenu();
    fetchTables();
    const token = localStorage.getItem("token");
    if (token) setUser({ token }); // simple check; you can decode token if needed
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
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

  const addToCart = (dish) => {
    if (!user) return alert("Please login to add items to cart");
    setCart((prev) => [...prev, dish]);
  };

  const removeFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const handleOrder = async () => {
    if (!user) return alert("Please login to place an order");
    if (!tableId) return alert("Select a table to place order");
    if (cart.length === 0) return alert("Add items to cart first");

    const items = cart.map((c) => ({ name: c.name, price: c.price }));
    try {
      const res = await createOrder({
        table_id: tableId,
        items: JSON.stringify(items),
        status: "pending",
        created_at: new Date().toISOString(),
      });
      alert(res.message || "Order placed!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {menuItems.length === 0 ? (
          <p>Loading menu...</p>
        ) : (
          menuItems.map((dish) => (
            <div
              key={dish.id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              <img
                src={
                  dish.image
                    ? `http://localhost:5000/uploads/${dish.image}`
                    : "/placeholder.png"
                }
                alt={dish.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{dish.name}</h3>
              <p className="text-sm mb-1">{dish.description}</p>
              <p>Price: Rs. {dish.price}</p>
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => addToCart(dish)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Table Selection */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Select Table:</label>
        <select
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        >
          <option value="">Select a table</option>
          {tables
            .filter((t) => t.status === "available")
            .map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} (Capacity: {t.capacity})
              </option>
            ))}
        </select>
      </div>

      {/* Cart */}
      <h2 className="text-xl font-semibold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="mb-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between mb-1">
              {item.name} - Rs. {item.price}
              <button
                className="text-red-500 hover:underline"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Menu;
