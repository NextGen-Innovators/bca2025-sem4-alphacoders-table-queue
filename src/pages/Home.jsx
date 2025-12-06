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

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-4/5"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-11/12"></div>
          <div className="h-4 bg-gray-300 rounded w-9/12"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-lg w-32 mt-6"></div>
      </div>
    </div>
  );

  return (
    <div className="mt-20">
      {/* HERO SECTION */}
      <section className="text-center px-6 py-28 bg-gradient-to-r from-red-100 to-red-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-red-700 mb-6 animate-fadeIn">
          Welcome to <span className="text-red-800">FoodieHub</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-200">
          Reserve tables, explore menus, and track orders live. Dining made effortless and delightful.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeIn delay-400">
          <Link
            to="/reservation"
            className="bg-red-600 text-white px-10 py-4 rounded-full hover:bg-red-700 shadow-lg transform hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            Reserve a Table
          </Link>
          <Link
            to="/menu"
            className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-full hover:bg-red-600 hover:text-white shadow-md transform hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            View Menu
          </Link>
        </div>
      </section>

      {/* POPULAR DISHES SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 animate-fadeIn">
          Our Most Loved Dishes
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-xl mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition shadow-lg"
            >
              Try Again
            </button>
          </div>
        ) : popularDishes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-12">No popular dishes available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image || "/fallback-dish.jpg"}
                    alt={`${dish.name} - Popular dish at FoodieHub`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback-dish.jpg";
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold">{dish.name}</h3>
                      {dish.price && <p className="text-2xl font-bold mt-1">Rs. {dish.price}</p>}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{dish.name}</h3>
                  <p className="mt-3 text-gray-600 line-clamp-2">
                    {dish.description || "A mouth-watering signature dish loved by many."}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    {dish.price && (
                      <p className="text-2xl font-bold text-red-600">Rs. {dish.price}</p>
                    )}
                    <Link
                      to="/reservation"
                      className="ml-auto bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="text-center px-6 py-24 bg-gradient-to-r from-red-50 via-red-100 to-red-50">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 animate-fadeIn">
          Ready to Dine With Us?
        </h2>
        <p className="text-gray-700 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed animate-fadeIn delay-200">
          Join thousands of happy diners. Reserve your table today and experience food like never before!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fadeIn delay-400">
          <Link
            to="/about"
            className="bg-red-600 text-white px-10 py-4 rounded-full hover:bg-red-700 shadow-lg transform hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            About FoodieHub
          </Link>
          <Link
            to="/contact"
            className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-full hover:bg-red-600 hover:text-white shadow-md transform hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;