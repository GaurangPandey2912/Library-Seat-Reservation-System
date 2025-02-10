import React from "react";
import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import { MapPin } from "lucide-react"; // Generic icon

const cities = [
  { name: "Mumbai", icon: MapPin },
  { name: "Delhi", icon: MapPin },
  { name: "Bangalore", icon: MapPin },
  { name: "Chennai", icon: MapPin },
  { name: "Kolkata", icon: MapPin },
  { name: "Hyderabad", icon: MapPin },
];

export default function MetroCities() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Metro Cities of India</h1>
      <div style={styles.grid}>
        {cities.map((city, index) => (
          <Card key={index} style={styles.card}>
            <div style={styles.tealBox}>
              <city.icon style={styles.icon} /> {/* Using MapPin */}
              <Button style={styles.button}>{city.name}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    padding: "24px",
  },
  heading: {
    fontSize: "24px",
    color: "teal",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  card: {
    backgroundColor: "#333",
    padding: "16px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
  },
  tealBox: {
    backgroundColor: "teal",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    width: "48px",
    height: "48px",
    color: "black",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
};
