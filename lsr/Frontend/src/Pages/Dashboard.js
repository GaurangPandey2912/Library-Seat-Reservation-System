import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { db, collection, getDocs } from "../firebase";
import Navbar from "../Components/navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LibraryDashboard = () => {
  const [totalSeats, setTotalSeats] = useState(0);
  const [occupiedSeats, setOccupiedSeats] = useState(0);
  const [floorData, setFloorData] = useState({});

  useEffect(() => {
    fetchSeatData();
  }, []);

  const fetchSeatData = async () => {
    const seatsRef = collection(db, "seats");
    const querySnapshot = await getDocs(seatsRef);
    let total = 0;
    let occupied = 0;
    let floorCount = { "Ground Floor": 0, "First Floor": 0, "Second Floor": 0 };

    querySnapshot.forEach((doc) => {
      total++;
      const data = doc.data();
      if (data.reservations && data.reservations.length > 0) {
        occupied++;
        const floor = doc.id.split("-")[0]; // Extract floor from seat ID
        if (floorCount[floor] !== undefined) {
          floorCount[floor] += 1;
        }
      }
    });

    setTotalSeats(total);
    setOccupiedSeats(occupied);
    setFloorData(floorCount);
  };

  const bookedPercentage = totalSeats > 0 ? (occupiedSeats / totalSeats) * 100 : 0;

  const peopleData = {
    labels: Object.keys(floorData),
    datasets: [
      {
        label: "People Count",
        data: Object.values(floorData),
        backgroundColor: "#00cccc",
        borderColor: "#008080",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh", backgroundColor: "black", color: "#008080", paddingTop: "100px" }}>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "40%", backgroundColor: "#007070", color: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Seats Booked</h2>
          <div style={{ width: "96px", height: "96px", backgroundColor: "#008080", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", padding: "10px" }}>
            <div style={{ width: "100%", marginBottom: "0" }}>
              <CircularProgressbar
                value={bookedPercentage}
                text={`${Math.round(bookedPercentage)}%`}
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor: "#00ffcc",
                  trailColor: "#004040",
                  textSize: "18px",
                })}
              />
            </div>
          </div>
        </div>
        <div style={{ width: "50%", backgroundColor: "#007070", padding: "20px", borderRadius: "16px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ color: "white", textAlign: "center" }}>People Count per Floor</h2>
          <Bar data={peopleData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>
    </div>
  );
};

export default LibraryDashboard;
