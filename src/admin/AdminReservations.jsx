import React, { useEffect, useState } from "react";
import { getAllReservations, cancelReservation } from "../api";


const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    const data = await getAllReservations();
    if (data) setReservations(data);
  };

  const handleCancel = async (id) => {
    try {
      await fetch(`http://localhost:5000/reservations/${id}`, {
        method: "DELETE",
      });
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel reservation");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Reservations</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Table</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Duration (min)</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className="text-center">
              <td className="p-2 border">{res.id}</td>
              <td className="p-2 border">{res.table_id}</td>
              <td className="p-2 border">{res.user_name}</td>
              <td className="p-2 border">{res.phone}</td>
              <td className="p-2 border">{res.duration_minutes}</td>
              <td className="p-2 border">{res.status}</td>
              <td className="p-2 border">
                {res.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(res.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservations;
