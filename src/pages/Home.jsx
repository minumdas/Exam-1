// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const startExam = () => {
    navigate("/exam"); // navigate to Exam page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Welcome to the Math Exam</h1>
      <p>Click the button below to start your exam.</p>
      <button
        onClick={startExam}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          marginTop: "2rem",
          cursor: "pointer",
          borderRadius: "8px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
        }}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Home;
