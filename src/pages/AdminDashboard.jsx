import React, { useEffect, useState } from "react";
import { getAllUsers, getTables, getQueue, getOrders } from "../api";
import { 
  Users, 
  Table, 
  Clock, 
  ShoppingBag, 
  RefreshCw, 
  Activity,
  UserCheck,
  AlertCircle
} from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);
  const [queue, setQueue] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, tablesData, queueData, ordersData] = await Promise.all([
        getAllUsers(),
        getTables(),
        getQueue(),
        getOrders()
      ]);

      setUsers(usersData || []);
      setTables(tablesData || []);
      setQueue(queueData || []);
      setOrders(ordersData || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const availableTables = tables.filter(t => t.status === "available").length;
  const bookedTables = tables.filter(t => t.status === "reserved").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const activeQueue = queue.filter(q => q.status === "waiting").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-700 flex items-center justify-center gap-3">
            <Activity className="w-6 h-6 text-red-600" />
            Live monitoring • Real-time updates • Full control
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last refreshed: {lastRefresh.toLocaleTimeString()}
            <button
              onClick={fetchData}
              className="ml-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh Now
            </button>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <Users className="w-12 h-12 mb-4 opacity-90" />
            <p className="text-4xl font-extrabold">{users.length}</p>
            <p className="text-blue-100">Total Users</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <Table className="w-12 h-12 mb-4 opacity-90" />
            <p className="text-4xl font-extrabold">{availableTables}</p>
            <p className="text-green-100">Available Tables</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <Clock className="w-12 h-12 mb-4 opacity-90" />
            <p className="text-4xl font-extrabold">{activeQueue}</p>
            <p className="text-orange-100">In Queue</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
            <ShoppingBag className="w-12 h-12 mb-4 opacity-90" />
            <p className="text-4xl font-extrabold">{pendingOrders}</p>
            <p className="text-purple-100">Pending Orders</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Users Table */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <UserCheck className="w-8 h-8" />
                Registered Users
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan="3" className="text-center py-10 text-gray-500">No users found</td></tr>
                  ) : (
                    users.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium">{u.name}</td>
                        <td className="px-6 py-4 text-gray-600">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                            u.role === "admin" 
                              ? "bg-purple-100 text-purple-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tables Status */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Table className="w-8 h-8" />
                Table Status
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {tables.map(t => (
                  <div
                    key={t.id}
                    className={`rounded-2xl p-6 text-center transition-all hover:scale-105 ${
                      t.status === "available"
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300"
                        : "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300"
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-gray-800">{t.name}</h3>
                    <p className="text-gray-600 mt-2">Up to {t.capacity} people</p>
                    <p className={`mt-4 text-lg font-bold ${
                      t.status === "available" ? "text-green-600" : "text-red-600"
                    }`}>
                      {t.status === "available" ? "AVAILABLE" : "BOOKED"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Queue */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Clock className="w-8 h-8" />
                Customer Queue
              </h2>
            </div>
            <div className="p-6">
              {queue.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No one in queue</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {queue.map((q, index) => (
                    <div key={q.id} className="bg-orange-50 rounded-2xl p-5 border-2 border-orange-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-xl text-gray-800">{q.user_name}</p>
                          <p className="text-gray-600">{q.phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-extrabold text-orange-600">#{index + 1}</p>
                          <p className="text-sm text-gray-600">Position</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <ShoppingBag className="w-8 h-8" />
                Recent Orders
              </h2>
            </div>
            <div className="p-6">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="bg-purple-50 rounded-2xl p-5 border-2 border-purple-200">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold text-lg">Table {o.table_id}</p>
                          <p className="text-sm text-gray-600">Items: {Array.isArray(o.items) ? o.items.length : 0}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          o.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800"
                            : o.status === "preparing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {o.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
