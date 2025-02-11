import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage.js";
import SeatReservation from "./Pages/Seatmap.js";
import Login from "./Pages/Login.js";
import LibraryDashboard from "./Pages/Dashboard.js";
import MetroCities from "./Pages/SelectCity.js";
import BookIssue from "./Pages/BookIssue.js";
import Admin from "./Pages/Admin.js";
import AddBook from "./Pages/AddBook.js";

import AddCategory from "./Pages/AddCategory.js";

// Homepage Component




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
          <Route path="/addCategory" element={<AddCategory />} />
          

          




          


          
        </Routes>
      
    </Router>
  );
}

export default App;