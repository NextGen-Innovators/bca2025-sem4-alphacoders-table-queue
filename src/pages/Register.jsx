import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Phone, CheckCircle, AlertCircle } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    else if (form.name.trim().length < 2) newErrors.name = "Name too short";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Invalid email format";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be 6+ characters";

    if (!form.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone.replace(/[\s-]/g, ""))) 
      newErrors.phone = "Enter valid 10-digit phone number";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: form.phone.replace(/[\s-]/g, ""), // clean phone
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error || "Registration failed. Try again.");
      }
    } catch (err) {
      setMessage("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
              <User className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-extrabold mb-2">Join FoodieHub</h1>
            <p className="text-white/90">Create your account & start booking tables today</p>
          </div>

          <div className="p-8 lg:p-10">
            {/* Success/Error Message */}
            {message && (
              <div className={`mb-6 p-5 rounded-2xl flex items-center gap-3 text-lg font-medium transition-all ${
                message.includes("successfully") || message.includes("created")
                  ? "bg-green-50 text-green-800 border-2 border-green-200"
                  : "bg-red-50 text-red-800 border-2 border-red-200"
              }`}>
                {message.includes("successfully") ? (
                  <CheckCircle className="w-7 h-7" />
                ) : (
                  <AlertCircle className="w-7 h-7" />
                )}
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all ${
                    errors.name
                      ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  } outline-none`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-2 ml-2">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  } outline-none`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-2 ml-2">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password (6+ characters)"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  } outline-none`}
                />
                {errors.password && <p className="text-red-600 text-sm mt-2 ml-2">{errors.password}</p>}
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-4 top-4 w-5 h-5 text-red-500" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number (10 digits)"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength="15"
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg transition-all ${
                    errors.phone
                      ? "border-red-500 focus:border-red-600 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  } outline-none`}
                />
                {errors.phone && <p className="text-red-600 text-sm mt-2 ml-2">{errors.phone}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-5 rounded-xl font-bold text-xl text-white transition-all transform hover:scale-105 shadow-xl ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
                >
                  Log in here
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>By signing up, you agree to our Terms & Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}