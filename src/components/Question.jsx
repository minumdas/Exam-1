import React from "react";

const Question = ({ question, options, selectedAnswer, onAnswer }) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>{question}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          return (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              style={{
                padding: "0.5rem 1rem",
                textAlign: "left",
                borderRadius: "4px",
                border: isSelected ? "2px solid #4caf50" : "1px solid #ccc",
                backgroundColor: isSelected ? "#e8f5e9" : "#fff",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
