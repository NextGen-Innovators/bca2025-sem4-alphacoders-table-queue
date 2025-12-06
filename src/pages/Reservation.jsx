import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    tableId: "",
    guests: "2",
  });
  const [tables, setTables] = useState([]);
  const [loadingTables, setLoadingTables] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch available tables when date/time changes
  useEffect(() => {
    if (!formData.date || !formData.time) {
      setTables([]);
      return;
    }

    const fetchTables = async () => {
      setLoadingTables(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/available-tables?date=${formData.date}&time=${formData.time}`
        );
        if (!res.ok) throw new Error("No tables available at this time");
        const data = await res.json();
        setTables(data);
      } catch (err) {
        setTables([]);
        setError("No tables available for selected time");
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, [formData.date, formData.time]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.tableId) return setError("Please select an available table");

    setLoadingSubmit(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guests: parseInt(formData.guests),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Reservation failed");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        tableId: "",
        guests: "2",
      });
      setTables([]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 pt-16 pb-32">
      {/* Hero */}
      <section className="text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-orange-600 mb-6">
            Reserve Your Table
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Book your perfect dining experience — whether it's a romantic dinner
            for two or a family feast with dal bhat and momos
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Let's Get You Seated</h2>
            <p className="opacity-90">
              Real-time table availability • Instant confirmation
            </p>
          </div>

          <div className="p-8 lg:p-12">
            {/* Success Message */}
            {success && (
              <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-center gap-4 text-green-800">
                <CheckCircle className="w-10 h-10" />
                <div>
                  <p className="font-bold text-xl">Reservation Confirmed!</p>
                  <p>We’ve saved your table. See you soon at FoodieHub</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-5 flex items-center gap-3 text-red-700">
                <AlertCircle className="w-8 h-8" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <Users className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg"
                  />
                </div>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg"
                  />
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                  <input
                    type="date"
                    name="date"
                    min={today}
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg"
                  />
                </div>

                <div className="relative">
                  <Users className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:outline-none transition text-lg appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Available Tables */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-red-600" />
                  Available Tables
                </label>

                {loadingTables ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-200 animate-pulse rounded-xl h-24"
                      ></div>
                    ))}
                  </div>
                ) : tables.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 text-lg">
                      {formData.date && formData.time
                        ? "No tables available at this time"
                        : "Please select date and time first"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tables.map((table) => (
                      <label
                        key={table.id}
                        className={`block cursor-pointer transition-all duration-300 rounded-2xl border-3 p-5 text-center hover:shadow-xl hover:scale-105 ${
                          formData.tableId === table.id
                            ? "border-red-600 bg-red-50 shadow-lg"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="tableId"
                          value={table.id}
                          checked={formData.tableId === table.id}
                          onChange={handleChange}
                          className="sr-only"
                          required
                        />
                        <div className="font-bold text-lg text-gray-800">
                          {table.name}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Up to {table.seats} seats
                        </div>
                        {table.location && (
                          <div className="text-xs text-gray-500 mt-2">
                            {table.location}
                          </div>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  loadingSubmit || !formData.tableId || tables.length === 0
                }
                className={`w-full py-6 rounded-2xl font-bold text-xl text-white transition-all duration-300 transform hover:scale-105 shadow-xl ${
                  formData.tableId && !loadingSubmit
                    ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {loadingSubmit ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Confirming Your Table...
                  </span>
                ) : (
                  "Reserve My Table"
                )}
              </button>
            </form>

            <div className="mt-10 text-center text-gray-600">
              <p className="text-sm">
                Questions? Call us at <strong>+977 980-000-0000</strong> • We
                speak English & Nepali
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
