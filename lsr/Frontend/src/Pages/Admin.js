import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Navbar from "../Components/adminNavbar"; // Adjust if needed

import "react-datepicker/dist/react-datepicker.css";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Admin = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const pieData = {
    labels: ["English Literature", "Quantum Mechanics", "Calculus", "Machine Learning", "Mythology"],
    datasets: [
      {
        data: [20, 15, 25, 30, 10], // Dummy values
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
      },
    ],
  };

  const lineData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    datasets: [
      {
        label: "Peak Timings",
        data: [5, 10, 15, 30, 20, 25], // Dummy values
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "black", padding: "20px" }}>
        <Navbar />
      <div style={{ width: "70%", padding: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", backgroundColor: "white", borderRadius: "8px", position: "relative", alignItems: "center", justifyContent: "center", marginTop:"100px" }}>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "black" }}>Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "black" }}>End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}
            />
          </div>
          <button 
            onClick={() => setShowChart(true)}
            style={{ padding: "10px 15px", backgroundColor: "#008080", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
            Go
          </button>
        </div>
      </div>

      {showChart && (
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px", textAlign: "center", width: "70%", height: "auto" }}>
          {/* Wrapper div for controlling Pie chart size */}
          <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
            <Pie data={pieData} options={pieOptions} />
          </div>

          <div style={{ marginTop: "40px" }}>
            <Line data={lineData} />
          </div>

          <div style={{ marginTop: "40px", fontSize: "18px", fontWeight: "bold", color: "black" }}>
            <p>Most Issued Book: "Introduction to Algorithms"</p>
            <p>Most Read Author: "Isaac Asimov"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
