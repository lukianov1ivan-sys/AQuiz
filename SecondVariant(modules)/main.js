console.log("main - запущен");

import { startButton, nextButton, resetScoreButton, quizContainer, startScreen} from "./quiz-ui.js";
import { startQuiz, handleNextButton, selectAnswer, resetBestScore, updateBestScore, bestScore} from "./quiz-logic.js";


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
  //const answerButtons = document.getElementById("answer-buttons");
  if (e.key >= "1" && e.key <= "4") {
    const buttons = Array.from(document.getElementById("answer-buttons").children);
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
document.getElementById("answer-buttons").addEventListener("click", selectAnswer);
updateBestScore(bestScore);