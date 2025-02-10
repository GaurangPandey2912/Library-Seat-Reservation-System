import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <div>
          <img src="/brandlogo.png" alt="Brand Logo" className="brand-logo" />
        </div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a href="#Login" className="navbar-signup-login">SignUp/LogIn</a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header>
        <h2>OpenChair</h2>
        <p>Your trusted solution for silence related issues. <br />
            Reserve. Read. Relax.</p>
        <button>Select Library</button>
      </header>

      {/* Features Section */}
      <section>
        <h3>Why Choose Us?</h3>
        <div className="features-container">
          {[
            "Reserve Seats",
            "Check Book Availability",
            "Membership",
            "24/7 Support"
          ].map((feature, index) => (
            <div key={index} className="feature-box">
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 OpenChair. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
