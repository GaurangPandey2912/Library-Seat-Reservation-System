import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate(); // Hook to redirect user after logout
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login"); // Redirect user to login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/">
        <img src="/brandlogo.png" alt="Brand Logo" style={styles.brandLogo} />
      </Link>
      <ul style={styles.navList}>
        <li><Link to="/Dashboard" style={styles.navItem}>Stats</Link></li>
        <li><Link to="/SeatMap" style={styles.navItem}>Book Seats</Link></li>
        <li><Link to="/BookIssue" style={styles.navItem}>Issue Book</Link></li>
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

// Apply hover effect dynamically to all buttons and links
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  nav ul li a:hover, 
  nav ul li button:hover {
    background-color: white !important;
    color: black !important;
  }
`, styleSheet.cssRules.length);

export default Navbar;
