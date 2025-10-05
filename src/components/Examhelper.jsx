// src/components/ExamHelper.js

import { wordProblemTemplates } from "./FractionProblems";

/**
 * Shuffles an array in-place using Fisher-Yates algorithm
 * @param {Array} array 
 * @returns {Array} shuffled array
 */
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Generates a set of random exam questions
 * - Only uses the fraction/word problems
 * - Shuffles them to randomize order
 *
 * @param {number} numQuestions - Total questions (default 30)
 * @returns {Array} questions [{ question, options, answer }]
 */
export const generateRandomQuestions = (numQuestions = 30) => {
  const shuffled = shuffleArray(wordProblemTemplates);
  return shuffled.slice(0, Math.min(numQuestions, shuffled.length));
};

/**
 * Example function to render questions in console (for testing)
 */
export const displayQuestions = (numQuestions = 30) => {
  const questions = generateRandomQuestions(numQuestions);
  questions.forEach((q, index) => {
    console.log(`${index + 1}. ${q.question}`);
    q.options.forEach((opt, i) => console.log(`   ${String.fromCharCode(65 + i)}. ${opt}`));
    console.log(`Answer: ${q.answer}`);
    console.log("------");
  });
};
