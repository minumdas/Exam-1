import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateRandomQuestions } from "../components/Examhelper";
import confetti from "canvas-confetti";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [], answers = {} } = location.state || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  if (!questions.length) return <div>No results to display.</div>;

  const currentQuestion = questions[currentIndex];
  const yourAnswer = answers[currentQuestion.question] || "Not answered";
  const correctAnswer = currentQuestion.answer;

  const correctCount = questions.reduce(
    (acc, q) => (answers[q.question] === q.answer ? acc + 1 : acc),
    0
  );
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  // Confetti for perfect score
  useEffect(() => {
    if (scorePercent === 100) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  }, [scorePercent]);

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
    }, 300);
  };

  const handlePrevious = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, 300);
  };

  const retakeExam = () => {
    const newQuestions = generateRandomQuestions(30);
    navigate("/exam", { state: { questions: newQuestions } });
  };

  // Random floating shapes for fun
  const renderShapes = () => {
    const colors = ["#ff6f61", "#ffca28", "#81d4fa", "#4caf50"];
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${left}%`,
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
            animation: `floatUp 6s linear infinite`,
            animationDelay: `${delay}s`,
            opacity: 0.7,
          }}
        ></div>
      );
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {renderShapes()}

      <div
        style={{
          width: "90%",
          maxWidth: "600px",
          backgroundColor: "#fffbe6",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <h1 style={{ color: "#ff6f61", marginBottom: "1rem" }}>
          🎉 Exam Results 🎉
        </h1>

        <div style={{ marginBottom: "1rem", fontSize: "1.2rem", color: "#333" }}>
          <strong>Score:</strong> {correctCount} / {questions.length} (
          {scorePercent}%)
        </div>

        <div
          style={{
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: animate ? "translateX(50px)" : "translateX(0)",
            opacity: animate ? 0 : 1,
            backgroundColor: "#e0f7fa",
            padding: "1rem",
            borderRadius: "12px",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "0.8rem" }}>{currentQuestion.question}</h2>
          <p>
            <strong>Your Answer:</strong>{" "}
            <span
              style={{
                color: yourAnswer === correctAnswer ? "green" : "red",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              {yourAnswer} {yourAnswer === correctAnswer ? "✅" : "❌"}
            </span>
          </p>
          <p>
            <strong>Correct Answer:</strong>{" "}
            <span
              style={{ color: "blue", fontWeight: "bold", fontSize: "1.1rem" }}
            >
              {correctAnswer} 🎯
            </span>
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ffcc80",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            ⬅ Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#81d4fa",
              cursor: currentIndex === questions.length - 1 ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            Next ➡
          </button>
        </div>

        <button
          onClick={retakeExam}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          🔄 Retake Exam / New Test
        </button>

        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Floating animation CSS */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(100%); opacity: 0; }
            50% { opacity: 0.7; }
            100% { transform: translateY(-150%); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Result;
