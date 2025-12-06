import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTable = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTable, setNewTable] = useState({ name: "", capacity: "" });

  const fetchTables = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/tables");
      setTables(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/tables",
        newTable,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNewTable({ name: "", capacity: "" });
      fetchTables();
    } catch (err) {
      console.error(err);
      alert("Failed to add table");
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Table Management</h1>

      {/* Add Table Form */}
      <form className="mb-6 flex gap-2" onSubmit={handleAddTable}>
        <input
          type="text"
          placeholder="Table Name"
          value={newTable.name}
          onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newTable.capacity}
          onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
          required
          className="border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Add Table
        </button>
      </form>

      {/* Tables List */}
      {loading ? (
        <p>Loading tables...</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4">Table Name</th>
              <th className="py-3 px-4">Capacity</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{t.name}</td>
                <td className="py-3 px-4">{t.capacity}</td>
                <td className="py-3 px-4">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTable;
