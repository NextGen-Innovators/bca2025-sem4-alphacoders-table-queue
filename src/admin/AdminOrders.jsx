import React, { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      alert("Failed to fetch orders");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      fetchOrders(); // refresh after status update
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Table</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">No orders found.</td>
            </tr>
          ) : (
            orders.map(order => {
              const itemsArray = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");

              return (
                <tr key={order.id} className="text-center">
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.table_id || "N/A"}</td>
                  <td className="p-2 border">{order.customer_name || order.customer_id}</td>
                  <td className="p-2 border">
                    {itemsArray.length > 0 ? (
                      <ul className="space-y-1">
                        {itemsArray.map((item, idx) => (
                          <li key={idx}>{item.name} x{item.quantity || 1}</li>
                        ))}
                      </ul>
                    ) : "No items"}
                  </td>
                  <td className={`p-2 border font-bold ${
                    order.status === "completed" ? "text-green-600" :
                    order.status === "cancelled" ? "text-red-600" : "text-gray-800"
                  }`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                  </td>
                  <td className="p-2 border">
                    {order.status === "pending" && (
                      <>
                        <button onClick={() => handleStatusChange(order.id, "completed")} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Complete</button>
                        <button onClick={() => handleStatusChange(order.id, "cancelled")} className="bg-red-600 text-white px-3 py-1 rounded">Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
