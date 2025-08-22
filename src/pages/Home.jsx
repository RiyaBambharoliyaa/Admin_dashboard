import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      {/* Welcome Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to Our Application 🚀
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          This is the home page for normal users. From here you can explore features, 
          manage your profile, and get started with your journey.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">🔒 Secure Login</h2>
          <p className="text-gray-600">Your data is safe with secure authentication.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
          <p className="text-gray-600">Get insights and analytics at your fingertips.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">⚡ Fast & Reliable</h2>
          <p className="text-gray-600">Optimized performance for smooth experience.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
