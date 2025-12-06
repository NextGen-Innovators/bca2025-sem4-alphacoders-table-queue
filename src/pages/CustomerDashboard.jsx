import React, { useEffect, useState } from "react";
import { getTables, reserveTable } from "../api";

const CustomerDashboard = () => {
  const [tables, setTables] = useState([]);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const data = await getTables();
    setTables(data || []);
  };

  const handleReserve = async (tableId) => {
    if (!phone) return alert("Enter your phone number to reserve");
    const data = await reserveTable({ user_name: "You", phone, table_id: tableId, time_slot: "Now" });
    alert(data.message || "Reserved!");
    fetchTables();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Available Tables</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tables.map(t => (
          <div key={t.id} className="border p-4 rounded shadow flex flex-col justify-between">
            <h3 className="font-bold">{t.name}</h3>
            <p>Capacity: {t.capacity}</p>
            <p>Status: {t.status}</p>
            {t.status === "available" && (
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleReserve(t.id)}
              >
                Reserve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
