import React from "react";
import Homepage from "./Login";

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">BrandLogo</h1>
        <ul className="flex space-x-6">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-gray-100">
        <h2 className="text-4xl font-bold">Welcome to Our Brand</h2>
        <p className="mt-2 text-lg text-gray-600">Your trusted solution for amazing services.</p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">Get Started</button>
      </header>

      {/* Features Section */}
      <section className="py-10 text-center">
        <h3 className="text-2xl font-semibold">Why Choose Us?</h3>
        <div className="mt-4 flex flex-wrap justify-center space-x-4">
          {["High Quality", "Trusted by Many", "Affordable Pricing", "24/7 Support"].map((feature, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-lg shadow-md w-40">
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-blue-600 text-white">
        <p>© 2025 Brand Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
