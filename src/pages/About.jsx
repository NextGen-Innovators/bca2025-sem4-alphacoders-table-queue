import React from "react";
import { Link } from "react-router-dom";
import localImage from "../assets/local.jpg";

// Reusable Value Card
const ValueCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 border border-gray-100 group">
    <div className="text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const About = () => {
  return (
    <div className="pt-16 lg:pt-20 pb-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative text-center py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-red-900 mb-8 leading-tight">
            नमस्ते & Welcome to<br />
            <span className="text-red-800">FoodieHub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Where Nepali hospitality meets modern dining. We’re not just a restaurant booking app — 
            we’re your personal food companion in the heart of Kathmandu.
          </p>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - Mobile First */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-1000"></div>
              <img
                src={localImage}
                alt="FoodieHub team sharing momos with local restaurant owners in Thamel, Kathmandu"
                className="relative rounded-3xl shadow-2xl w-full h-auto max-h-96 lg:max-h-screen object-cover border-8 border-white"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Our Story – Born in the Streets of <span className="text-red-700">Kathmandu</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                In 2024, a group of food lovers and tech enthusiasts came together with one dream: 
                to make dining in Nepal simpler, faster, and more joyful.
              </p>
              <p>
                We saw friends waiting hours for tables during Dashain. We heard aunties calling 10 restaurants 
                just to find one with space. We felt the frustration of not knowing where to eat authentic 
                <strong> Newari khaja</strong> or the best <strong>sel roti</strong> in town.
              </p>
              <p>
                So we built <strong className="text-red-700">FoodieHub</strong> — an app that brings your favorite 
                momos, dal bhat, thakali khana, and chicken chilly straight to your phone, with just one tap.
              </p>
              <blockquote className="italic text-xl font-medium text-gray-800 border-l-4 border-red-600 pl-6 py-2">
                "From Thamel’s bustling streets to Patan’s hidden courtyards — we connect you to the soul of Nepali food."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-red-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Promise to You
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
            These are the values that guide every line of code and every restaurant we onboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            <ValueCard
              icon={
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
              title="Hospitality First"
              description="We treat every guest like family — because in Nepal, food is love, and love is served hot."
            />
            <ValueCard
              icon={
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Fast & Reliable"
              description="Book in seconds. Get confirmed instantly. Track your table live — no more waiting in the rain."
            />
            <ValueCard
              icon={
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              title="Support Local"
              description="We help small khaja ghars, family-run thakali joints, and your favorite auntie’s mo:mo shop thrive."
            />
          </div>
        </div>
      </section>

      {/* TEAM & CULTURE */}
      <section className="py-24 px-6 bg-red-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Made with Love in <span className="text-red-700">Nepal</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            We’re a passionate team of developers, designers, and certified foodies from Kathmandu, Pokhara, Chitwan, and beyond — 
            united by our love for great food and even greater experiences.
          </p>

          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-red-100">
            <p className="text-2xl lg:text-3xl italic text-gray-800 font-medium leading-relaxed">
              “Food is not just fuel.<br />
              It’s culture. It’s memory. It’s connection.”
            </p>
            <p className="text-red-600 text-lg font-semibold mt-4">
              — The FoodieHub Team
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center bg-gradient-to-t from-red-50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Ready to Taste the Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of happy foodies who’ve made FoodieHub their go-to for unforgettable meals across Nepal.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/menu"
              className="bg-red-600 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-red-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Explore Menu
            </Link>
            <Link
              to="/reservation"
              className="border-3 border-red-600 text-red-600 bg-white px-12 py-5 rounded-full text-lg font-bold hover:bg-red-600 hover:text-white shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Reserve a Table Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;