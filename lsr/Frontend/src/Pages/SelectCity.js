import React, { useState } from "react";
import Navbar from "../Components/navbar"; // Import Navbar
import { Card } from "../Components/ui/card";
import { MapPin } from "lucide-react"; // Using a generic icon

const cities = [
  { name: "Mumbai", icon: MapPin },
  { name: "Delhi", icon: MapPin },
  { name: "Bangalore", icon: MapPin },
  { name: "Chennai", icon: MapPin },
  { name: "Kolkata", icon: MapPin },
  { name: "Hyderabad", icon: MapPin },
];

export default function MetroCities() {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName); // Set the clicked city
  };

  return (
    <div style={styles.container}>
      <Navbar /> {/* Navbar added here */}

      <h1 style={styles.heading}>Select City</h1>
      <div style={styles.grid}>
        {cities.map((city, index) => (
          <div 
            key={index} 
            style={styles.cardContainer} 
            onClick={() => handleCityClick(city.name)}
          >
            <Card style={styles.card}>
              <div style={styles.tealBox}>
                <city.icon style={styles.icon} />
                <span style={styles.cityName}>{city.name}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Show Search Bar when a city is clicked */}
      {selectedCity && (
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder={`Search in ${selectedCity}...`} 
            style={styles.searchBar} 
          />
        </div>
      )}
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
    marginTop: "80px", // Added margin so the navbar doesn't overlap
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  cardContainer: {
    cursor: "pointer", // 👈 Make entire card clickable
    transition: "transform 0.2s",
  },
  cardContainerHover: {
    transform: "scale(1.05)",
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
  cityName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "black",
  },
  searchContainer: {
    marginTop: "20px",
    width: "80%",
    maxWidth: "400px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid teal",
    outline: "none",
    color: "black",
    backgroundColor: "white",
  },
};


