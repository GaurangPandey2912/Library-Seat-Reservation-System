import React, { useState } from "react";
import './Seatmap.css';

const SeatReservation = () => {
  const [seats, setSeats] = useState(Array(10).fill(false)); // Array of 10 seats, false means unreserved
  const [reservedSeat, setReservedSeat] = useState(null);

  const handleReserve = (index) => {
    if (!seats[index]) {
      const updatedSeats = [...seats];
      updatedSeats[index] = true;
      setSeats(updatedSeats);
      setReservedSeat(index);
    } else {
      alert("This seat is already reserved.");
    }
  };

  const handleCancel = (index) => {
    const updatedSeats = [...seats];
    updatedSeats[index] = false;
    setSeats(updatedSeats);
    setReservedSeat(null);
  };

  return (
    <div className="reservation-container">
      <h2>Library Seat Reservation</h2>
      <div className="seat-container">
        {seats.map((isReserved, index) => (
          <div
            key={index}
            className={`seat ${isReserved ? "reserved" : "available"}`}
            onClick={() =>
              isReserved ? handleCancel(index) : handleReserve(index)
            }
          >
            {isReserved ? "Reserved" : "Available"}
          </div>
        ))}
      </div>
      <div className="reservation-status">
        {reservedSeat !== null ? (
          <p>Seat {reservedSeat + 1} reserved successfully!</p>
        ) : (
          <p>No seat reserved.</p>
        )}
      </div>
    </div>
  );
};

export default SeatReservation;
