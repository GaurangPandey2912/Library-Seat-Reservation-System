import React, { useState } from "react";
import Navbar from "../Components/navbar";
import { Card } from "../Components/ui/card";
import { MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dummy data for each city
const cityData = {
  Mumbai: ["Borivali", "Andheri", "Colaba", "Juhu Beach"],
  Delhi: ["Saket", "Dwarka", "Connaught Place", "Chandni Chowk"],
  Bangalore: ["MG Road", "Lalbagh", "Electronic City", "Indiranagar"],
  Chennai: ["Marina Beach", "T Nagar", "Guindy", "Velachery"],
  Kolkata: ["Howrah Bridge", "Victoria Memorial", "Park Street", "Salt Lake"],
  Hyderabad: ["Charminar", "Hitech City", "Gachibowli", "Banjara Hills"],
};

export default function MetroCities() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleCityClick = (cityName) => {
    setSelectedCity(cityName);
    setSearchTerm("");
    setFilteredSuggestions(cityData[cityName] || []);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter suggestions based on input
    if (selectedCity) {
      const suggestions = cityData[selectedCity].filter((place) =>
        place.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]); // Hide suggestions after selection
  };

  const handleSearchSubmit = () => {
    if (searchTerm) {
      navigate("/SeatMap"); // Redirect to the seat map page
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />

      <h1 style={styles.heading}>Select City</h1>
      <div style={styles.grid}>
        {Object.keys(cityData).map((city, index) => (
          <div
            key={index}
            style={styles.cardContainer}
            onClick={() => handleCityClick(city)}
          >
            <Card style={styles.card}>
              <div style={styles.tealBox}>
                <MapPin style={styles.icon} />
                <span style={styles.cityName}>{city}</span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Search Bar and Suggestions */}
      {selectedCity && (
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder={`Search in ${selectedCity}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              style={styles.searchBar}
            />
            <button onClick={handleSearchSubmit} style={styles.searchButton}>
              <Search />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {filteredSuggestions.length > 0 && (
            <ul style={styles.suggestionsList}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
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
    marginTop: "80px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  cardContainer: {
    cursor: "pointer",
    transition: "transform 0.2s",
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
    position: "relative",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    border: "1px solid teal",
    backgroundColor: "white",
    overflow: "hidden",
  },
  searchBar: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "none",
    outline: "none",
    color: "black",
  },
  searchButton: {
    padding: "10px",
    backgroundColor: "teal",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    border: "1px solid teal",
    borderRadius: "4px",
    listStyle: "none",
    padding: 0,
    margin: "5px 0",
    zIndex: 10,
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid teal",
    color: "black",
  },
};

