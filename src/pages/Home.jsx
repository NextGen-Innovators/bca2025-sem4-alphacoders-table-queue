import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularDishes, setPopularDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularDishes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/popular-dishes");
        if (!response.ok) throw new Error("Failed to fetch popular dishes");
        const data = await response.json();
        setPopularDishes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularDishes();
  }, []);

  return (
    <div className="mt-20">

      {/* HERO SECTION */}
      <section className="text-center px-6 py-20 bg-gray-50">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">Welcome to FoodieHub</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Reserve tables, explore menus, and track orders live.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/reservation" 
            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition shadow-lg"
          >
            Reserve a Table
          </Link>
          <Link 
            to="/menu" 
            className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* POPULAR DISHES SECTION */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Popular Dishes</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : popularDishes.length === 0 ? (
          <p className="text-center text-gray-500">No dishes available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <img
                  src={dish.image || "/fallback-dish.jpg"}
                  alt={dish.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold">{dish.name}</h3>
                  <p className="mt-3 text-gray-600">{dish.description || "Delicious dish"}</p>
                  {dish.price && <p className="mt-4 text-xl font-semibold text-red-600">Rs. {dish.price}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="text-center px-6 py-20 bg-red-50">
        <h2 className="text-4xl font-bold mb-6">Learn More About Us</h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover how FoodieHub makes dining effortless and enjoyable. 
          Check out our menu, reserve tables, or get in touch!
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/about" 
            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition"
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
