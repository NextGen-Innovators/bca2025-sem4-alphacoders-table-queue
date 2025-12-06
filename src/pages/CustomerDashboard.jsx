import React, { useEffect, useState } from "react";
import { getTables, getMenu } from "../api";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [reservedTable, setReservedTable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTables();
    fetchMenu();
  }, []);

  const fetchTables = async () => {
    try {
      const data = await getTables();
      setTables(data || []);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  const fetchMenu = async () => {
    try {
      const data = await getMenu();
      setMenu(data || []);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  const handleReserve = (table) => {
    setReservedTable(table);
    alert(`You reserved ${table.name}`);
  };

  const handleAddToCart = (item) => {
    // Save to localStorage so CustomerCart can read it
    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existing, item]));
    alert(`${item.name} added to cart`);
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

      {/* Available Tables */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Available Tables</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tables.map((t) => (
            <div
              key={t.id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              <h3 className="font-bold">{t.name}</h3>
              <p>Capacity: {t.capacity}</p>
              <p>Status: {t.status}</p>

              {t.status === "available" && !reservedTable && (
                <button
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleReserve(t)}
                >
                  Reserve
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Available Menu */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{item.description}</p>
              <p className="font-semibold">Rs. {item.price}</p>
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
