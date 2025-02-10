import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LibraryDashboard = () => {
  const totalSeats = 100;
  const occupiedSeats = 63;
  const bookedPercentage = (occupiedSeats / totalSeats) * 100;

  const peopleData = {
    labels: ["Ground Floor", "First Floor", "Second Floor"],
    datasets: [
      {
        label: "People Count",
        data: [20, 25, 18],
        backgroundColor: "#00cccc",
        borderColor: "#008080",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", maxHeight: "100vh", backgroundColor: "black", color: "#008080", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: "40%", backgroundColor: "#007070", color: "white", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Seats Booked</h2>
          <div style={{ width: "96px", height: "96px", backgroundColor: "#008080", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", padding: "10px" }}>
            <div style={{ width: "100%",marginBottom:"0" }}>
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
      <div style={{ marginTop: "-10%", display: "flex", flexDirection: "column", width: "40%", gap: "10px" }}>
        <button style={{ padding: "10px 20px", backgroundColor: "grey", border: "none", color: "white", fontSize: "16px", borderRadius: "8px", cursor: "pointer", width: "100%", transition: "background-color 0.3s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#008080"}
          onMouseOut={(e) => e.target.style.backgroundColor = "grey"}>
          Book Seat
        </button>
        <button style={{ padding: "10px 20px", backgroundColor: "grey", border: "none", color: "white", fontSize: "16px", borderRadius: "8px", cursor: "pointer", width: "100%", transition: "background-color 0.3s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#008080"}
          onMouseOut={(e) => e.target.style.backgroundColor = "grey"}>
          Issue Book
        </button>
      </div>
      <style jsx global>{`
        body {
          background-color: black;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default LibraryDashboard;
