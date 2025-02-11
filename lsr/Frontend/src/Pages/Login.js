import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "../Components/navbar";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Sign-up successful! You can now log in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        
        // Check if admin credentials are entered
        if (isAdmin && email === "admin@openchair.com" && password === "admin123") {
          alert("Logged in as Admin");
          navigate("/admin"); // Redirect to admin page
        } else {
          alert(`Logged in as: ${email}`);
          navigate("/Dashboard"); // Redirect to user dashboard
        }
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
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
