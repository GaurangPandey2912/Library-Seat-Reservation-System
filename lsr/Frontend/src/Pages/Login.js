import React, { useState } from "react";
import "./login.css";

const Homepage = () => {
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
    <div className="container">
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
        <h2 className="title">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            <label>Login as Admin</label>
          </div>

          <button type="submit" className="submit-button">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
