import React, { useEffect, useState } from "react";
import { getCustomerOrders } from "../../api"; // make sure api.js has this

const CustomerHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getCustomerOrders(); // API call
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) return <div>No orders yet.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow">
            <p><strong>Table ID:</strong> {order.table_id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Ordered At:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc pl-5">
              {JSON.parse(order.items).map((item, idx) => (
                <li key={idx}>{item.name} - Rs. {item.price}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHistory;
