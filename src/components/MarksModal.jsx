import React, { useEffect, useState } from "react";

const MarksModal = ({ totalMarks, obtainedMarks, onClose }) => {
  const [displayedMarks, setDisplayedMarks] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(obtainedMarks / 50); // adjust speed
    const interval = setInterval(() => {
      current += increment;
      if (current >= obtainedMarks) {
        current = obtainedMarks;
        clearInterval(interval);
      }
      setDisplayedMarks(current);
    }, 30); // speed of animation
    return () => clearInterval(interval);
  }, [obtainedMarks]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: "0 0 20px gold",
          animation: "pop 0.5s ease-out",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#f39c12" }}>
          🎉 Congratulations! 🎉
        </h2>
        <p
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#e74c3c",
            transform: `scale(${1 + displayedMarks / totalMarks / 2})`,
            transition: "transform 0.1s",
          }}
        >
          {displayedMarks} / {totalMarks}
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#3498db",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>

      {/* Optional pop animation */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default MarksModal;
