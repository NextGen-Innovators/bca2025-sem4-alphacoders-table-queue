import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email address";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Phone must be 10 digits";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => navigate("/login"), 1500); // redirect to login after 1.5s
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white to-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Register</h2>
        
        {message && (
          <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 text-center">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 text-center">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 text-center">{errors.password}</p>}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1 text-center">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg font-semibold shadow hover:scale-105 transform transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
