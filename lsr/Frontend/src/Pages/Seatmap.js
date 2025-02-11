import React, { useState, useEffect } from "react";
import { db, auth, collection, doc, getDoc, setDoc, getDocs } from "../firebase";
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
  const [reservedSeats, setReservedSeats] = useState({});
  const [bookingForm, setBookingForm] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", timeSlot: "" });
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({ window: false, charging: false, cubicle: false });

  useEffect(() => {
    auth.onAuthStateChanged((loggedInUser) => {
      setUser(loggedInUser);
    });

    fetchReservedSeats();
  }, [selectedFloor]);

  const fetchReservedSeats = async () => {
    const seatsRef = collection(db, "seats");
    const querySnapshot = await getDocs(seatsRef);

    let seatBookings = {};
    querySnapshot.forEach((doc) => {
      seatBookings[doc.id] = doc.data().reservations || [];
    });

    setReservedSeats(seatBookings);
  };

  const handleSeatClick = (seat) => {
    if (!user) {
      alert("Please log in to book a seat.");
      return;
    }

    if ((seat === "WC41" || seat === "WC50") && !(filters.window && filters.cubicle)) {
      alert("You can only select this seat when both Window and Cubicle options are checked.");
      return;
    }

    setBookingForm(seat);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.timeSlot) {
      alert("Please fill all details.");
      return;
    }

    const seatRef = doc(db, "seats", `${selectedFloor}-${bookingForm}`);

    try {
      const seatSnap = await getDoc(seatRef);
      let seatData = seatSnap.exists() ? seatSnap.data() : { reservations: [] };

      if (!Array.isArray(seatData.reservations)) {
        seatData.reservations = [];
      }

      const isSlotTaken = seatData.reservations.some(reservation => reservation.timeSlot === formData.timeSlot);
      if (isSlotTaken) {
        alert("This seat is already booked for the selected time slot. Please choose another slot.");
        return;
      }

      seatData.reservations.push({ ...formData, userId: user.uid });

      await setDoc(seatRef, seatData);

      alert("Seat booked successfully!");
      setBookingForm(null);
      setFormData({ name: "", phone: "", timeSlot: "" });
      fetchReservedSeats();
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const filterSeats = (seat) => {
    if (seat === "WC41" || seat === "WC50") {
      return true;
    }
    if (filters.window && !seat.startsWith("W")) return false;
    if (filters.charging && !chargingSeats.has(seat)) return false;
    if (filters.cubicle && !seat.startsWith("C")) return false;
    return true;
  };

  return (
    <div className="seat-selector">
      <Navbar />
      <h2>Library Seat Reservation</h2>

      <div className="floor-selection">
        {Object.keys(floors).map((floor) => (
          <button key={floor} className="floor-btn" onClick={() => setSelectedFloor(floor)}>
            {floor}
          </button>
        ))}
      </div>

      <div className="preferences">
        <label><input type="checkbox" name="window" onChange={handleFilterChange} /> Window Seat</label>
        <label><input type="checkbox" name="charging" onChange={handleFilterChange} /> Charging Point</label>
        <label><input type="checkbox" name="cubicle" onChange={handleFilterChange} /> Cubicle</label>
      </div>

      <div className="seat-map">
        {floors[selectedFloor].map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat) => (
              filterSeats(seat) && (
                <div
                  key={seat}
                  className={`seat ${reservedSeats[`${selectedFloor}-${seat}`]?.length ? "reserved" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              )
            ))}
          </div>
        ))}
      </div>
      {bookingForm && (
        <div className="booking-form enhanced-booking-form large-form">
          <h3>Booking Seat {bookingForm}</h3>
          <form onSubmit={handleBookingSubmit} className="booking-form-container">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Time Slot:</label>
              <select name="timeSlot" value={formData.timeSlot} onChange={handleInputChange} required>
                <option value="">Select a time slot</option>
                <option value="9AM-11AM">9AM-11AM</option>
                <option value="11AM-1PM">11AM-1PM</option>
                <option value="1PM-3PM">1PM-3PM</option>
                <option value="3PM-5PM">3PM-5PM</option>
              </select>
            </div>
            <div className="button-group">
              <button type="submit" className="confirm-btn large-btn">Confirm Booking</button>
              <button type="button" className="cancel-btn large-btn" onClick={() => setBookingForm(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;