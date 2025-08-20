console.log("quiz-logic - запущен");

import { showQuestion, showScore, updateTimerDisplay, resetQuiz, nextButton, correctSound, incorrectSound, quizContainer, startScreen, timerDisplay} from './quiz-ui.js';
import { questions } from './quiz-data.js';
import { shuffleArray } from './quiz-util.js';

export const bestScoreDisplay = document.getElementById("best-score-display");
export const progressBar = document.getElementById("progress-bar");
export const answerButtons = document.getElementById("answer-buttons");

export let timer;
export let timeLeft = 10; 
export let currentQuestionIndex = 0;
export let score = 0;
export let bestScore = 0;
export let incorrectAnswers = [];


export function startTimer() {
  timerDisplay.classList.remove("hidden");
  timeLeft = 10;
  updateTimerDisplay(timeLeft);
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";
      Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
      });
    }
  }, 1000);
}

export function startQuiz() {//скидання стану вікторини
  resetQuiz();
  startScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  startTimer()
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Наступне питання";
  nextButton.style.display = "none";
  incorrectAnswers = [];
  progressBar.style.width = '0%';
  shuffleArray(questions);
  showQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length);
}

export function selectAnswer(e) {
  clearInterval(timer); 
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if(isCorrect) {
    selectedButton.classList.add("correct");
    score++;
    correctSound.play(); 
  } else {
    selectedButton.classList.add("incorrect");
    incorrectSound.play();
    const currentQuestion = questions[currentQuestionIndex];
    incorrectAnswers.push(currentQuestion);
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

export function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length);
    startTimer();
  } else {
    timerDisplay.classList.add("hidden");
    showScore(score, questions.length, bestScore);
  }
}

export function updateBestScore() {
  const storedScore = localStorage.getItem("bestQuizScore");
  if (storedScore) {
    bestScore = parseInt(storedScore);
  } else {
    bestScore = 0;
  }
    bestScoreDisplay.textContent = `Найкращий результат: ${bestScore}`;
  }

export function resetBestScore() {
  localStorage.removeItem("bestQuizScore");
  bestScore = 0;
  alert("Найкращий результат був скинутий!");
}