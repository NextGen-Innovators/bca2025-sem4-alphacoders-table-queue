import React, { useEffect, useState } from "react";
import { getAllReservations, cancelReservation } from "../api"; // adjust path if needed
import { Trash2 } from "lucide-react";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllReservations();
      setReservations(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await cancelReservation(id);
      setReservations(reservations.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel reservation");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reservations...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Reservations</h1>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-500">No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Table</th>
                <th className="border px-4 py-2">Date & Time</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id} className="text-center hover:bg-gray-50">
                  <td className="border px-4 py-2">{r.id}</td>
                  <td className="border px-4 py-2">{r.customer_name}</td>
                  <td className="border px-4 py-2">{r.phone}</td>
                  <td className="border px-4 py-2">{r.table_name}</td>
                  <td className="border px-4 py-2">
                    {new Date(r.datetime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleCancel(r.id)}
                      className="flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
