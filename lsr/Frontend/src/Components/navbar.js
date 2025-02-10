import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <img src="/brandlogo.png" alt="Brand Logo" style={styles.brandLogo} />
      <ul style={styles.navList}>
        <li><a href="#stats" style={styles.navItem}>Stats</a></li>
        <li><a href="#bookSeat" style={styles.navItem}>Book Seats</a></li>
        <li><a href="#issue" style={styles.navItem}>Issue Book</a></li>
        <li style={styles.logoutButton}>
          <a href="#logout" style={styles.logoutItem}>Logout</a>
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
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)", // 👈 Added shadow effect
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
    marginRight: "20px", // 👈 Margin applied only to Logout button
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
    color: "teal", // 👈 Changed Logout button text color to teal
    transition: "background 0.3s ease-in-out, color 0.3s ease-in-out",
  },
};

// Apply hover effect dynamically
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  nav ul li a:hover {
    background-color: white !important;
    color: black !important;
  }
`, styleSheet.cssRules.length);

export default Navbar;
