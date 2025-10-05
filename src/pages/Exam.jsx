import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import Question from "../components/Question";
import { generateRandomQuestions } from "../components/Examhelper";

const Exam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
    } else {
      const qs = generateRandomQuestions(30);
      setQuestions(qs);
    }
  }, [location.state]);

  const handleAnswer = (question, answer) =>
    setAnswers((prev) => ({ ...prev, [question]: answer }));

  const handleNext = () =>
    currentIndex < questions.length - 1 && setCurrentIndex(currentIndex + 1);

  const handlePrevious = () =>
    currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  const submitExam = () =>
    navigate("/result", { state: { questions, answers } });

  const handleTimeUp = () => submitExam();

  if (!questions.length) return <div>Loading questions...</div>;

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.question] || "";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Math Exam</h1>
      <Timer initialTime={3600} onTimeUp={handleTimeUp} />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "1rem 0",
          gap: "0.3rem",
        }}
      >
        {questions.map((q, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: answers[q.question] ? "#4caf50" : "#ccc",
              cursor: "pointer",
            }}
            title={`Question ${idx + 1}`}
          />
        ))}
      </div>

      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswer={(ans) => handleAnswer(currentQuestion.question, ans)}
        selectedAnswer={selectedAnswer}
      />

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        {currentIndex < questions.length - 1 ? (
          <button onClick={handleNext} disabled={!selectedAnswer}>
            Next
          </button>
        ) : (
          <button
            onClick={submitExam}
            disabled={!selectedAnswer}
            style={{
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Submit
          </button>
        )}
      </div>

      <p style={{ marginTop: "1rem" }}>
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Exam;
