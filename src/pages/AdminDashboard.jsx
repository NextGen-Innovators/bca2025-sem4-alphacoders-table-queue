import React, { useEffect, useState } from "react";
import { getAllUsers, getTables, getQueue, getOrders } from "../api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);
  const [queue, setQueue] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersData = await getAllUsers();
    const tablesData = await getTables();
    const queueData = await getQueue();
    const ordersData = await getOrders();

    setUsers(usersData || []);
    setTables(tablesData || []);
    setQueue(queueData || []);
    setOrders(ordersData || []);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td className="border px-2 py-1">{u.id}</td>
                <td className="border px-2 py-1">{u.name}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tables</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Capacity</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(t => (
              <tr key={t.id}>
                <td className="border px-2 py-1">{t.id}</td>
                <td className="border px-2 py-1">{t.name}</td>
                <td className="border px-2 py-1">{t.capacity}</td>
                <td className="border px-2 py-1">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Queue</h2>
        <ul className="list-disc pl-6">
          {queue.map(q => (
            <li key={q.id}>
              {q.user_name} - {q.phone} (Position: {q.position}, Status: {q.status})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <ul className="list-disc pl-6">
          {orders.map(o => (
            <li key={o.id}>
              Table {o.table_id} - Items: {o.items} - Status: {o.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
