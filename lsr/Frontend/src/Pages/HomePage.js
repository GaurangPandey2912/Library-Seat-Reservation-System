import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Library Management System</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md">Login</Link>
        <Link to="/signup" className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md">Signup</Link>
      </div>
    </div>
  );
};

const Homepage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default Homepage;
