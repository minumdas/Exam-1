// src/components/ReviewCard.jsx
import React from "react";

const ReviewCard = ({ question, userAnswer, correctAnswer }) => {
  const isCorrect = userAnswer === correctAnswer;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: isCorrect ? "#e0f7e9" : "#ffe0e0",
      }}
    >
      <h3>{question}</h3>
      <p>
        <strong>Your Answer:</strong>{" "}
        <span style={{ color: isCorrect ? "green" : "red" }}>
          {userAnswer || "No answer"}
        </span>
      </p>
      <p>
        <strong>Correct Answer:</strong> {correctAnswer}
      </p>
    </div>
  );
};

export default ReviewCard;
