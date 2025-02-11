import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./Pages/HomePage.js";
import SeatReservation from "./Pages/Seatmap.js";
import Login from "./Pages/Login.js";
import LibraryDashboard from "./Pages/Dashboard.js";
import MetroCities from "./Pages/SelectCity.js";
import BookIssue from "./Pages/BookIssue.js";
import Admin from "./Pages/Admin.js";
import AddBook from "./Pages/AddBook.js";
import TestFirestore from "./Pages/test.js";

// Homepage Component
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Our Homepage</h1>
        <p>Discover amazing content and features.</p>
        <Link to="/about">
          <button className="App-link">Learn More</button>
        </Link>
      </header>
    </div>
  );
}



function App() {
  return (
    <Router>
      

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seatMap" element={<SeatReservation />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<LibraryDashboard />} />
          <Route path="/selectCity" element={<MetroCities />} />
          <Route path="/bookIssue" element={<BookIssue />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/addBook" element={<AddBook />} />
          

          




          


          
        </Routes>
      
    </Router>
  );
}

export default App;