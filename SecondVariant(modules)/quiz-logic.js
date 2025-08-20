import { showQuestion, showScore, updateTimerDisplay, resetQuiz, nextButton, correctSound, incorrectSound, quizContainer, startScreen} from './quiz-ui.js';
import { questions } from './quiz-data.js';

export const bestScoreDisplay = document.getElementById("best-score-display");
export const progressBar = document.getElementById("progress-bar");
export const answerButtons = document.getElementById("answer-buttons");

export let timer;
export let timeLeft = 10; 
export let currentQuestionIndex = 0;
export let score = 0;
export let bestScore = 0;
export let incorrectAnswers = [];



export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function startTimer() {
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
  console.log("startQuiz - start1");
  startScreen.classList.add("hidden");
  console.log("startQuiz - start2");
  quizContainer.classList.remove("hidden");
  console.log("startQuiz - start3");
  //console.log("startQuiz-startScreen hidden:", startScreen.classList.contains("hidden")); пошук помилки з видимістю сторінки після старту
  //console.log("startQuiz-quizContainer hidden:", quizContainer.classList.contains("hidden")); 
  currentQuestionIndex = 0;
  score = 0;
  console.log("startQuiz - start4");
  nextButton.innerHTML = "Наступне питання";
  nextButton.style.display = "none";
  incorrectAnswers = [];
  progressBar.style.width = '0%';
  console.log("startQuiz - start4");
  shuffleArray(questions);
  console.log("startQuiz - end4");
  showQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length);
  console.log("startQuiz - end");
}

export function selectAnswer(e) {
  //console.log("selectAnswer - start1");
  clearInterval(timer); 
  //console.log("selectAnswer - start2");
  const selectedButton = e.target;
  //console.log("selectAnswer - start3");
  const isCorrect = selectedButton.dataset.correct === "true";
  console.log("selectAnswer 1 - start");
  if(isCorrect) {
    console.log("selectAnswer 2 - start");
    selectedButton.classList.add("correct");
    score++;
    correctSound.play(); 
    console.log("selectAnswer 2 - end");
  } else {
    console.log("selectAnswer 3 - start");
    selectedButton.classList.add("incorrect");
    incorrectSound.play();
    const currentQuestion = questions[currentQuestionIndex];
    incorrectAnswers.push(currentQuestion);
    console.log("selectAnswer 3 - end");
  }
  Array.from(answerButtons.children).forEach(button => {
    console.log("selectAnswer 4 - start");
    if (button.dataset.correct === "true") {
      console.log("selectAnswer 5 - start");
      button.classList.add("correct");
      console.log("selectAnswer 5 - end");
    }
    console.log("selectAnswer 6 - start");
    button.disabled = true;
    console.log("selectAnswer 6 - end");
    console.log("selectAnswer 4 - end");
  });
  console.log("selectAnswer 1 - end");
  nextButton.style.display = "block";
  console.log("selectAnswer - end"); 
}

export function handleNextButton() {
    console.log("handleNextButton - start");
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex], currentQuestionIndex, questions.length);
    startTimer();
  } else {
    showScore(score, questions.length, bestScore);
  }
  console.log("handleNextButton - end");
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