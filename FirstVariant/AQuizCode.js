console.log("AQuizCode - файл працює");
console.log("Перший варіант коду");


const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const resetScoreButton = document.getElementById("reset-score");
const bestScoreDisplay = document.getElementById("best-score-display");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");

//console.log("startScreen hidden:", startScreen.classList.contains("hidden")); пошук помилки з видимістю сторінки після старту
//console.log("quizContainer hidden:", quizContainer.classList.contains("hidden")); 

let timer;
let timeLeft = 10; 
let currentQuestionIndex = 0;
let score = 0;
let bestScore = 0;
let incorrectAnswers = [];

function startQuiz() {//скидання стану вікторини
  resetQuiz();
  startScreen.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  //console.log("startQuiz-startScreen hidden:", startScreen.classList.contains("hidden")); пошук помилки з видимістю сторінки після старту
  //console.log("startQuiz-quizContainer hidden:", quizContainer.classList.contains("hidden")); 
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Наступне питання";
  nextButton.style.display = "none";
  incorrectAnswers = [];
  progressBar.style.width = '0%';
  shuffleArray(questions);
  showQuestion();
}
function showQuestion() { //показати питання
  questionText.classList.remove("fade-in");
  answerButtons.classList.remove("fade-in");
  void questionText.offsetWidth; 
  void answerButtons.offsetWidth;

  clearInterval(timer); 
  while (answerButtons.firstChild) { //очистка кнопок відповідей
    answerButtons.removeChild(answerButtons.firstChild);
  }
  let currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question; 
  shuffleArray(currentQuestion.answers);
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  currentQuestion.answers.forEach(answer => { //створення кнопок для відповідей
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);

  });
  questionText.classList.add("fade-in");
  answerButtons.classList.add("fade-in");
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = false;
  });
  startTimer(); 
}
function selectAnswer(e) {
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
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    progressBar.style.width = '100%';
    showScore();
  }
}
function showScore() { //показати результат
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  questionText.textContent = `Ваш результат: ${score} з ${questions.length}`;
  nextButton.textContent = "Спробувати знову";
  nextButton.style.display = "block";
  clearInterval(timer); 
  /*nextButton.addEventListener("click", () => { викликав проблему зміщення елементів після перезапуску вікторини
    startScreen.style.display = "block";
    quizContainer.style.display = "none";
  }, { once: true });
  */
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestQuizScore", bestScore);
  }
  bestScoreDisplay.textContent = `Найкращий результат: ${bestScore}`;
  /*if (incorrectAnswers.length > 0) {
    questionText.textContent += "\n\nНеправильні відповіді:";
    incorrectAnswers.forEach(q => {
      const p = document.createElement("p");
    p.textContent = `${q.question} - Правильна відповідь: ${q.answers.find(a => a.correct).text}`;
    answerButtons.appendChild(p);
    });
  }*/
}

function startTimer() {
  timeLeft = 10;
  timerDisplay.textContent = `Час: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Час: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";
      Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
      });
    }
  }, 1000);
}
function updateBestScore() {
  const storedScore = localStorage.getItem("bestQuizScore");
  if (storedScore) {
    bestScore = parseInt(storedScore);
  } else {
    bestScore = 0;
  }
    bestScoreDisplay.textContent = `Найкращий результат: ${bestScore}`;
  }
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function resetBestScore() {
  localStorage.removeItem("bestQuizScore");
  bestScore = 0;
  updateBestScore();
  alert("Найкращий результат був скинутий!");
}
function resetQuiz() {
  questionText.textContent = "";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  nextButton.style.display = "none";
}
startButton.addEventListener("click", startQuiz);
resetScoreButton.addEventListener("click", resetBestScore);
nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Спробувати знову") {
    startScreen.classList.remove("hidden"); 
    quizContainer.classList.add("hidden");
    //console.log("nextButton.addEventListener-startScreen hidden:", startScreen.classList.contains("hidden")); пошук помилки з видимістю сторінки після старту
    //console.log("nextButton.addEventListener-quizContainer hidden:", quizContainer.classList.contains("hidden"));
    //resetQuiz();
    //startQuiz();
  }else {
    handleNextButton();
  }
});
document.addEventListener("keydown", (e) => {
  const answerButtons = document.getElementById("answer-buttons");
  const buttons = Array.from(answerButtons.children);
  if (e.key >= "1" && e.key <= "4") {
    const index = parseInt(e.key) - 1;
    if (buttons[index] && !buttons[index].disabled) {
      buttons[index].click(); 
    }
  }
  if (e.key === 'Enter') {
    if (nextButton.style.display !== "none") {
      nextButton.click();
  }
}
});

updateBestScore();
//startQuiz();

