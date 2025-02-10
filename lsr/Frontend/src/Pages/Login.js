import React, { useState } from "react";
import Navbar from "../Components/navbar"; // Import your existing Navbar component
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    setError("");
    alert(`${isSignup ? "Signed up" : "Logged in"} as: ${email} ${isAdmin ? "(Admin)" : ""}`);
  };

  return (
    <>
      {/* Importing the Navbar component */}
      <nav>
        <div>
          <img src="/brandlogo.png" alt="Brand Logo" className="brand-logo" />
        </div>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <a href="login" className="navbar-signup-login">SignUp/LogIn</a>
          </li>
        </ul>
      </nav>

      {/* Authentication Container */}
      <div className="auth-container">
        <div className="auth-box">
          <div className="toggle-buttons">
            <button
              className={!isSignup ? "active" : ""}
              onClick={() => setIsSignup(false)}
            >
              Login
            </button>
            <button
              className={isSignup ? "active" : ""}
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </button>
          </div>
          <h2 className="auth-title">{isSignup ? "Sign Up" : "Login"}</h2>
          {error && <p className="auth-error">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="styled-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="styled-input"
              />
            </div>

            <div className="form-group checkbox-container">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              <label>Login as Admin</label>
            </div>

            <button type="submit" className="auth-submit">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
