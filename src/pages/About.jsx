import React from "react";
import { Link } from "react-router-dom";
import localImage from "../assets/local.jpg";

// Reusable Card Component
const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
    <div className="text-red-600 mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="pt-20 pb-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* HERO SECTION */}
      <section className="text-center py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-red-700 mb-8 animate-fadeIn">
            Namaste & Welcome to <span className="text-red-800">FoodieHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fadeIn delay-200">
            Where Nepali hospitality meets modern dining. We’re not just a
            restaurant booking app — we’re your personal food companion in the
            heart of Kathmandu.
          </p>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={localImage}
              alt="FoodieHub Team & Restaurant"
              className="rounded-3xl shadow-2xl w-[500px] h-[100px] object-cover lg:w-[800px] lg:h-[500px]"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
              Our Story – Born in the Streets of Kathmandu
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              In 2024, a group of food lovers and tech enthusiasts came together
              with one dream: to make dining in Nepal simpler, faster, and more
              joyful.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We noticed how hard it was to find good restaurants, call for
              reservations, or wait endlessly for tables — especially during
              festivals and weekends. So we built <strong>FoodieHub</strong> — a
              platform that brings your favorite momos, dal bhat, Newari khaja,
              and biryani right to your phone.
            </p>
            <p className="text-lg text-gray-600 font-medium italic">
              "From Thamel to Patan, from local khaja ghar to fine dining — we
              connect you to the best food Nepal has to offer."
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-16">
            Our Promise to You
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard
              icon={
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              }
              title="Hospitality First"
              description="We treat every guest like family — because in Nepal, food is love."
            />
            <ValueCard
              icon={
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              title="Fast & Reliable"
              description="Instant reservations, live order tracking — no more waiting or confusion."
            />
            <ValueCard
              icon={
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              title="Support Local"
              description="We help small khaja ghars, family restaurants, and hidden gems reach more food lovers."
            />
          </div>
        </div>
      </section>

      {/* TEAM / CULTURE */}
      <section className="py-20 px-6 bg-red-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
            Made with Love in Nepal
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            We’re a passionate team of developers, designers, and foodies from
            Kathmandu, Pokhara, and Chitwan — united by our love for great food
            and better experiences.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl">
              <p className="text-2xl italic text-gray-700 font-medium">
                “Food is not just fuel. It’s culture, memory, and connection.”
                <br />
                <span className="text-red-600 text-lg not-italic">
                  — The FoodieHub Team
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Ready to Taste the Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of happy diners who’ve made FoodieHub their go-to for
            unforgettable meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/menu"
              className="bg-red-600 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-red-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Explore Menu
            </Link>
            <Link
              to="/reservation"
              className="border-2 border-red-600 text-red-600 px-10 py-5 rounded-full text-lg font-semibold hover:bg-red-600 hover:text-white shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
