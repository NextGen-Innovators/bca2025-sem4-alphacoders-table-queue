import React, { useEffect, useState } from "react";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    tableId: ""
  });
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch available tables whenever date or time changes
  useEffect(() => {
    if (!formData.date || !formData.time) return;

    const fetchTables = async () => {
      setLoadingTables(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/available-tables?date=${formData.date}&time=${formData.time}`
        );
        if (!response.ok) throw new Error("Failed to fetch tables");
        const data = await response.json();
        setTables(data); // backend returns list of available tables
      } catch (err) {
        console.error(err);
        setTables([]);
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, [formData.date, formData.time]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to submit reservation");

      setSuccess("Reservation successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        tableId: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="pt-20 px-6 bg-gray-50 min-h-screen">
      <section className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">Reserve a Table</h1>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Select your preferred date, time, and available table below.
        </p>
      </section>

      <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {success && <p className="text-green-600 mb-4">{success}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <select
              name="tableId"
              value={formData.tableId}
              onChange={handleChange}
              required
              disabled={loadingTables || tables.length === 0}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Table</option>
              {loadingTables ? (
                <option>Loading tables...</option>
              ) : tables.length === 0 ? (
                <option>No tables available</option>
              ) : (
                tables.map((table) => (
                  <option key={table.id} value={table.id}>
                    {table.name} (Seats: {table.seats})
                  </option>
                ))
              )}
            </select>
          </div>

          <button
            type="submit"
            disabled={loadingSubmit || !formData.tableId}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            {loadingSubmit ? "Submitting..." : "Reserve Table"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Reservation;
