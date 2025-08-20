console.log("quiz-ui - запущен");

import { updateBestScore } from './quiz-logic.js';
import { shuffleArray } from './quiz-util.js';

export const questionText = document.getElementById("question-text");
export const answerButtons = document.getElementById("answer-buttons");
export const nextButton = document.getElementById("nxt-btn");
export const scoreDisplay = document.getElementById("score");
export const timerDisplay = document.getElementById("timer");
export const correctSound = document.getElementById("correctSound");
export const incorrectSound = document.getElementById("incorrectSound");
export const startScreen = document.getElementById("start-screen");
export const startButton = document.getElementById("start-btn");
export const quizContainer = document.getElementById("quiz-container");
export const resetScoreButton = document.getElementById("reset-score");
export const bestScoreDisplay = document.getElementById("best-score-display");
export const progressBar = document.getElementById("progress-bar");
export const progressContainer = document.getElementById("progress-container");

export function showQuestion(currentQuestion, currentQuestionIndex, questionsLength) {
  questionText.classList.remove("fade-in");
  answerButtons.classList.remove("fade-in");
  shuffleArray(currentQuestion.answers);
  void questionText.offsetWidth;
  void answerButtons.offsetWidth;

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }

  questionText.textContent = currentQuestion.question;
  const progress = ((currentQuestionIndex + 1 ) / questionsLength) * 100;
  progressBar.style.width = `${progress}%`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = "true";
    }
  });

  questionText.classList.add("fade-in");
  answerButtons.classList.add("fade-in");
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = false;
  });
}

export function showScore(score, questionsLength, bestScore) {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  questionText.textContent = `Ваш результат: ${score} з ${questionsLength}`;
  nextButton.textContent = "Спробувати знову";
  nextButton.style.display = "block";
  if (score > bestScore) {
    bestScore = score;
  }
  updateBestScore(bestScore);
  bestScoreDisplay.textContent = `Найкращий результат: ${bestScore}`;
}

export function updateTimerDisplay(timeLeft) {
  timerDisplay.textContent = `Час: ${timeLeft}`;
}

export function resetQuiz() {
  questionText.textContent = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.style.display = "none";
  progressBar.style.width = '0%';
}