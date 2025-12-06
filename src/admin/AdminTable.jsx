import React, { useEffect, useState } from "react";
import { getTables, addTable, updateTable, deleteTable } from "../api";
import { 
  Table, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Users,
  AlertCircle
} from "lucide-react";

const AdminTable = () => {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({ name: "", capacity: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const data = await getTables();
      setTables(data || []);
    } catch (err) {
      setError("Failed to load tables");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.capacity || form.capacity < 1) {
      setError("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    const tableData = {
      name: form.name.trim(),
      capacity: parseInt(form.capacity, 10),
    };

    try {
      if (editId) {
        await updateTable(editId, tableData);
        setSuccess("Table updated successfully!");
        setEditId(null);
      } else {
        await addTable(tableData);
        setSuccess("New table added successfully!");
      }

      setForm({ name: "", capacity: "" });
      fetchTables();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(editId ? "Failed to update table" : "Failed to add table");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (table) => {
    setForm({ name: table.name, capacity: table.capacity });
    setEditId(table.id);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this table?\nThis action cannot be undone.")) return;

    setLoading(true);
    try {
      await deleteTable(id);
      setSuccess("Table deleted successfully");
      fetchTables();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete table");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ name: "", capacity: "" });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pt-20 pb-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            Manage Tables
          </h1>
          <p className="text-xl text-gray-700">Add, edit, or remove dining tables</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-center gap-4 text-green-800 shadow-lg">
            <CheckCircle className="w-10 h-10" />
            <p className="font-bold text-xl">{success}</p>
          </div>
        )}
        {error && (
          <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-center gap-4 text-red-700 shadow-lg">
            <AlertCircle className="w-10 h-10" />
            <p className="font-bold text-xl">{error}</p>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Plus className="w-10 h-10 text-red-600" />
            {editId ? "Edit Table" : "Add New Table"}
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <Table className="absolute left-4 top-4 w-6 h-6 text-red-500" />
              <input
                type="text"
                name="name"
                placeholder="Table Name (e.g., Table 5, VIP Corner)"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg transition-all"
                required
              />
            </div>

            <div className="relative">
              <Users className="absolute left-4 top-4 w-6 h-6 text-red-500" />
              <input
                type="number"
                name="capacity"
                placeholder="Capacity (e.g., 4)"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                max="20"
                className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg transition-all"
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-5 rounded-xl font-bold text-xl text-white transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 ${
                  loading 
                    ? "bg-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                }`}
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : editId ? (
                  <>
                    <Edit3 className="w-6 h-6" />
                    Update Table
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6" />
                    Add Table
                  </>
                )}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-5 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center gap-2"
                >
                  <XCircle className="w-6 h-6" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tables List */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8">
            <h2 className="text-3xl font-bold flex items-center gap-4">
              <Table className="w-10 h-10" />
              All Dining Tables
            </h2>
          </div>

          {loading && tables.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading tables...</p>
            </div>
          ) : tables.length === 0 ? (
            <div className="p-20 text-center text-gray-500">
              <Table className="w-24 h-24 mx-auto mb-6 text-gray-300" />
              <p className="text-2xl">No tables added yet</p>
              <p>Add your first table using the form above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
              {tables.map((table) => {
                const isAvailable = table.status === "available";
                return (
                  <div
                    key={table.id}
                    className={`rounded-3xl p-8 text-center shadow-xl transition-all duration-500 hover:scale-105 border-4 ${
                      isAvailable
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                        : "bg-gradient-to-br from-red-50 to-rose-50 border-red-300"
                    }`}
                  >
                    <div className="mb-6">
                      {isAvailable ? (
                        <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
                      ) : (
                        <XCircle className="w-20 h-20 mx-auto text-red-600" />
                      )}
                    </div>

                    <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
                      {table.name}
                    </h3>

                    <div className="space-y-3 mb-8">
                      <p className="text-4xl font-bold text-gray-700 flex items-center justify-center gap-2">
                        <Users className="w-8 h-8 text-gray-600" />
                        {table.capacity}
                      </p>
                      <span className={`inline-block px-8 py-3 rounded-full text-lg font-bold ${
                        isAvailable
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}>
                        {isAvailable ? "AVAILABLE" : "BOOKED"}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(table)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all hover:scale-110 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-5 h-5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(table.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition-all hover:scale-110 shadow-lg flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTable;