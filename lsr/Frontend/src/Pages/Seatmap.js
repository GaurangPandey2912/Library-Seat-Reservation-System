import React, { useState } from "react";
import "./Seatmap.css";
import Navbar from "../Components/navbar";

const floors = {
  "Ground Floor": [
    ["W1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "W10"],
    ["W11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "W20"],
    ["W21", "G22", "G23", "G24", "G25", "G26", "G27", "G28", "G29", "W30"],
    ["WC31", "C32", "C33", "C34", "C35", "C36", "C37", "C38", "C39", "WC40"],
    ["WC41", "C42", "C43", "C44", "C45", "C46", "C47", "C48", "C49", "WC50"]
  ],
  "First Floor": [
    ["W1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "W10"],
    ["W11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "W20"],
    ["W21", "F22", "F23", "F24", "F25", "F26", "F27", "F28", "F29", "W30"],
    ["WC31", "C32", "C33", "C34", "C35", "C36", "C37", "C38", "C39", "WC40"],
    ["WC41", "C42", "C43", "C44", "C45", "C46", "C47", "C48", "C49", "WC50"]
  ],
  "Second Floor": [
    ["W1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "W10"],
    ["W11", "S12", "S13", "S14", "S15", "S16", "S17", "S18", "S19", "W20"],
    ["W21", "S22", "S23", "S24", "S25", "S26", "S27", "S28", "S29", "W30"],
    ["WC31", "C32", "C33", "C34", "C35", "C36", "C37", "C38", "C39", "WC40"],
    ["WC41", "C42", "C43", "C44", "C45", "C46", "C47", "C48", "C49", "WC50"]
  ]
};

const chargingSeats = new Set(["G3", "G6", "G9", "G12", "G15", "G18", "G21", "G24", "G27", "G30", "C32", "C35", "C38", "C41", "C44", "C47", "W1", "W10", "WC31", "WC40", "WC41", "WC50"]);

const SeatSelector = () => {
  const [selectedFloor, setSelectedFloor] = useState("Ground Floor");
  const [preferences, setPreferences] = useState({ window: false, chargingPoint: false, cubicle: false });
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handlePreferenceChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.checked });
  };

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor);
    setSelectedSeats([]);
  };

  const findBestSeats = () => {
    let bestSeats = [];
    const seatLayout = floors[selectedFloor];
    
    seatLayout.forEach((row) => {
      row.forEach((seat) => {
        if (preferences.window && preferences.cubicle) {
          if (seat === "WC41" || seat === "WC50") {
            bestSeats.push(seat);
          }
        } else if (preferences.chargingPoint && preferences.cubicle) {
          if (chargingSeats.has(seat) && seat.startsWith("C")) {
            bestSeats.push(seat);
          }
        } else if (preferences.chargingPoint && preferences.window) {
          if (chargingSeats.has(seat) && seat.startsWith("W")) {
            bestSeats.push(seat);
          }
        } else if (
          (preferences.chargingPoint && chargingSeats.has(seat)) ||
          (preferences.window && seat.startsWith("W")) ||
          (preferences.cubicle && seat.startsWith("C"))
        ) {
          bestSeats.push(seat);
        }
      });
    });

    setSelectedSeats(bestSeats.length > 0 ? bestSeats : ["No matching seats available"]);
  };

  return (
    <div className="seat-selector">
      <Navbar />
      <h2>Library Seat Reservation</h2>
      <div className="floor-selection">
        {Object.keys(floors).map((floor) => (
          <button key={floor} className="floor-btn large-btn" onClick={() => handleFloorChange(floor)}>
            {floor}
          </button>
        ))}
      </div>
      <div className="preferences">
        <label><input type="checkbox" name="window" onChange={handlePreferenceChange} /> Window Seat</label>
        <label><input type="checkbox" name="chargingPoint" onChange={handlePreferenceChange} /> Charging Point</label>
        <label><input type="checkbox" name="cubicle" onChange={handlePreferenceChange} /> Cubicle</label>
      </div>
      <button className="find-seat-btn" onClick={findBestSeats}>Find Best Seats</button>
      {selectedSeats.length > 0 && <div className="seat-result">Best Seats: {selectedSeats.join(", ")}</div>}
      <div className="seat-map">
        {floors[selectedFloor].map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat) => (
              <div key={seat} className={`seat ${selectedSeats.includes(seat) ? "selected" : ""}`}>{seat}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelector;
