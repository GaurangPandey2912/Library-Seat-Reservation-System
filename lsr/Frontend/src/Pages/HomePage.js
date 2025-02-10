import React from "react";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-teal-600">Welcome to Our Homepage</h1>
      <p className="text-lg text-gray-700 mt-4">Your one-stop solution for all things amazing.</p>
      <button className="mt-6 px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition">
        Get Started
      </button>
    </div>
  );
};

export default App;
