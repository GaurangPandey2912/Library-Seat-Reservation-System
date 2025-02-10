import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

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

// About Page Component
function About() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>About Us</h1>
        <p>We are here to make your experience better.</p>
        <Link to="/">
          <button className="App-link">Go Home</button>
        </Link>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/" className="App-link">Home</Link>
          <Link to="/about" className="App-link">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
