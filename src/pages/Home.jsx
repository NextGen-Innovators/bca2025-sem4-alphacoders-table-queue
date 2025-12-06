import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy Popular Dishes Data (Beautiful & Realistic)
const dummyPopularDishes = [
  {
    id: 1,
    name: "Truffle Butter Pasta",
    description:
      "Handmade tagliatelle tossed in rich truffle butter with wild mushrooms & parmesan snow",
    price: "1250",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc44ae37b?w=800&h=600&fit=crop",
    category: "Pasta",
  },
  {
    id: 2,
    name: "Wagyu Beef Burger",
    description:
      "Juicy A5 wagyu patty, aged cheddar, truffle aioli, brioche bun & crispy onions",
    price: "1890",
    image:
      "https://images.unsplash.com/photo-1565299507175-b9ac1657d0dd?w=800&h=600&fit=crop",
    category: "Burger",
  },
  {
    id: 3,
    name: "Lobster Thermidor",
    description:
      "Fresh Atlantic lobster in creamy cognac sauce, gratinated with gruyère",
    price: "4200",
    image:
      "https://images.unsplash.com/photo-1534086720760-4ed13d8dbfe0?w=800&h=600&fit=crop",
    category: "Seafood",
  },
  {
    id: 4,
    name: "Sushi Omakase Platter",
    description:
      "Chef's daily selection of premium nigiri & sashimi with wasabi & ginger",
    price: "3800",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
    category: "Japanese",
  },
  {
    id: 5,
    name: "Tiramisu Sphere",
    description:
      "Deconstructed coffee-soaked ladyfingers with mascarpone mousse & cocoa dust",
    price: "890",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c7f057f3?w=800&h=600&fit=crop",
    category: "Dessert",
  },
  {
    id: 6,
    name: "Grilled Octopus",
    description:
      "Mediterranean octopus with smoked paprika, chorizo oil & charred lemon",
    price: "2100",
    image:
      "https://images.unsplash.com/photo-1625937288790-5afb5d7f8c88?w=800&h=600&fit=crop",
    category: "Seafood",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION - Ultra Modern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-pink-800 text-white py-32 px-6">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black tracking-tight"
          >
            Foodie<span className="text-yellow-400">Hub</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed opacity-90"
          >
            Where flavor meets elegance. Reserve your table and savor moments
            that matter.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/reservation"
              className="group bg-white text-red-700 px-12 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-400 hover:text-white transform hover:scale-110 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              Reserve Table
              <span className="group-hover:translate-x-2 transition">→</span>
            </Link>
            <Link
              to="/menu"
              className="border-4 border-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all duration-300 backdrop-blur-md bg-white/10"
            >
              Explore Menu
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </section>

      {/* POPULAR DISHES - Glassmorphism Cards */}
      <section className="py-24 px-6 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold text-center mb-20 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
          >
            Signature Creations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {dummyPopularDishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15 }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {dish.category}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800 group-hover:text-red-600 transition">
                    {dish.name}
                  </h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {dish.description}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-4xl font-black text-red-600">
                      Rs. {dish.price}
                    </span>
                    <Link
                      to="/reservation"
                      className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - Elegant */}
      <section className="py-28 px-6 bg-gradient-to-t from-black to-gray-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
          >
            Your Table Awaits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Join us for an unforgettable dining experience crafted with passion
            and precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/reservation"
              className="inline-block bg-white text-black px-16 py-6 rounded-full text-2xl font-bold shadow-2xl hover:bg-yellow-400 transform hover:scale-110 transition-all duration-500"
            >
              Reserve Your Spot Now
            </Link>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Home;
