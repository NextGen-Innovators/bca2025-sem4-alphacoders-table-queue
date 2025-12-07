import React, { useEffect, useState } from "react";
import { getAuthHeaders } from "../../api"; // adjust the path to your api.js

const CustomerHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/orders/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no past orders.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold mb-2">
                Order #{order.id} - Table {order.table_id}
              </h2>
              <p className="text-gray-600 mb-4">Status: {order.status}</p>
              <ul className="list-disc list-inside">
                {(order.items || []).map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mt-4 text-sm">
                Ordered at: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerHistory;
