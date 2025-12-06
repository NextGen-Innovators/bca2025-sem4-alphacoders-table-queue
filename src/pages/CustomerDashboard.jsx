import React, { useEffect, useState } from "react";
import { getTables, reserveTable, getMenu } from "../api";

const CustomerDashboard = () => {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchTables();
    fetchMenu();
  }, []);

  // Fetch tables
  const fetchTables = async () => {
    const data = await getTables();
    setTables(data || []);
  };

  // Fetch menu
  const fetchMenu = async () => {
    const data = await getMenu();
    setMenu(data || []);
  };

  // Reserve table
  const handleReserve = async (tableId) => {
    if (!phone) {
      alert("Enter your phone number to reserve");
      return;
    }

    const data = await reserveTable({
      user_name: "You",
      phone,
      table_id: tableId,
      time_slot: "Now",
    });

    alert(data.message || "Reserved!");
    fetchTables();
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>

      {/* Phone input */}
      <div>
        <input
          type="text"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

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

              {t.status === "available" && (
                <button
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleReserve(t.id)}
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
        <h2 className="text-xl font-semibold mb-3">Available Menu</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menu.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              {item.image && (
                <img
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}

              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{item.description}</p>
              <p className="font-semibold">Rs. {item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
