import React, { useState } from "react";
import "./Seatmap.css";

const floors = {
  "Ground Floor": [
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10"],
    ["G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G20"],
    ["G21", "G22", "G23", "G24", "G25", "G26", "G27", "G28", "G29", "G30"],
    ["G31", "G32", "G33", "G34", "G35", "G36", "G37", "G38", "G39", "G40"],
    ["G41", "G42", "G43", "G44", "G45", "G46", "G47", "G48", "G49", "G50"]
  ],
  "First Floor": [
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
    ["F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20"],
    ["F21", "F22", "F23", "F24", "F25", "F26", "F27", "F28", "F29", "F30"],
    ["F31", "F32", "F33", "F34", "F35", "F36", "F37", "F38", "F39", "F40"],
    ["F41", "F42", "F43", "F44", "F45", "F46", "F47", "F48", "F49", "F50"]
  ],
  "Second Floor": [
    ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10"],
    ["S11", "S12", "S13", "S14", "S15", "S16", "S17", "S18", "S19", "S20"],
    ["S21", "S22", "S23", "S24", "S25", "S26", "S27", "S28", "S29", "S30"],
    ["S31", "S32", "S33", "S34", "S35", "S36", "S37", "S38", "S39", "S40"],
    ["S41", "S42", "S43", "S44", "S45", "S46", "S47", "S48", "S49", "S50"]
  ]
};

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
        if (preferences.chargingPoint || preferences.window || preferences.cubicle) {
          bestSeats.push(seat);
        }
      });
    });

    setSelectedSeats(bestSeats.length > 0 ? bestSeats : ["No matching seats available"]);
  };

  return (
    <div className="seat-selector">
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
