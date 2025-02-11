import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase auth

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      navigate("/"); // Redirect to home/login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/">
        <img src="/brandlogo.png" alt="Brand Logo" style={styles.brandLogo} />
      </Link>
      <ul style={styles.navList}>
        <li><Link to="/admin" style={styles.navItem}>Stats</Link></li>
        <li><Link to="/AddBook" style={styles.navItem}>Add Book</Link></li>
        <li><Link to="/AddCategory" style={styles.navItem}>Add Category</Link></li>
        <li style={styles.logoutButton}>
          <button onClick={handleLogout} style={styles.logoutItem}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

// Inline Styles
const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    zIndex: 1000,
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
  },
  brandLogo: {
    height: "50px",
    marginLeft: "20px",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    height: "100%",
    marginLeft: "auto",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    height: "100%",
    padding: "0 20px",
    backgroundColor: "black",
    transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
  },
  logoutButton: {
    marginRight: "20px",
  },
  logoutItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    height: "100%",
    padding: "0 20px",
    backgroundColor: "black",
    color: "teal",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
  },
};

// Apply hover effect dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  nav ul li button:hover {
    background-color: white !important;
    color: black !important;
  }
`, styleSheet.cssRules.length);

export default Navbar;
