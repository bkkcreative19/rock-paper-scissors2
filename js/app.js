const ul = document.querySelector(".choices");
const list = document.querySelectorAll(".choices__choice");
const computerChoiceDOM = document.querySelector(".computer-choice");
const btn = document.querySelector(".btn");
const answers = document.querySelector(".answers");
const results = document.querySelector(".results");
const result = document.querySelector(".result");
const scoreDOM = document.querySelector(".score");
const resetBtn = document.querySelector(".reset-btn");
const playerChoiceDOM = document.querySelector(".player-choice");
let playerChoice;
const choices = ["paper", "scissors", "rock"];
let score = Number(localStorage.getItem("score"));
let didWin;
scoreDOM.textContent = score;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btnn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

list.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    computerChoiceDOM.classList.remove("answers__computer");
    computerChoiceDOM.classList.add("waiting-circle");

    ul.style.display = "none";
    answers.style.display = "flex";
    setTimeout(function () {
      computerChoiceDOM.style.display = "flex";
      computerChoiceDOM.classList.remove("waiting-circle");
      computerChoiceDOM.classList.add("answers__computer");
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      createImage(computerChoiceDOM, randomChoice);
    }, 3000);
    setTimeout(function () {
      results.style.display = "flex";
      if (didWin === "tie") {
        result.textContent = "It's a Draw";
      } else if (!didWin) {
        result.textContent = "you lost";
        if (scoreDOM.textContent < 1) {
          scoreDOM.textContent = 0;
        } else {
          scoreDOM.textContent = score - 1;
        }

        localStorage.setItem("score", scoreDOM.textContent);
      } else if (didWin) {
        result.textContent = "you won";
        scoreDOM.textContent = score + 1;
        localStorage.setItem("score", scoreDOM.textContent);
      }
    }, 4000);

    setTimeout(function () {
      if (
        playerChoiceDOM.classList.contains("paper") &&
        computerChoiceDOM.classList.contains("paper")
      ) {
        didWin = "tie";
      }
      if (
        playerChoiceDOM.classList.contains("rock") &&
        computerChoiceDOM.classList.contains("rock")
      ) {
        didWin = "tie";
      }
      if (
        playerChoiceDOM.classList.contains("scissors") &&
        computerChoiceDOM.classList.contains("scissors")
      ) {
        didWin = "tie";
      }
      if (
        playerChoiceDOM.classList.contains("scissors") &&
        computerChoiceDOM.classList.contains("paper")
      ) {
        didWin = true;
      }
      if (
        playerChoiceDOM.classList.contains("scissors") &&
        computerChoiceDOM.classList.contains("rock")
      ) {
        didWin = false;
      }
      if (
        playerChoiceDOM.classList.contains("paper") &&
        computerChoiceDOM.classList.contains("rock")
      ) {
        didWin = true;
      }
      if (
        playerChoiceDOM.classList.contains("paper") &&
        computerChoiceDOM.classList.contains("scissors")
      ) {
        didWin = false;
      }
      if (
        playerChoiceDOM.classList.contains("rock") &&
        computerChoiceDOM.classList.contains("scissors")
      ) {
        didWin = true;
      }
      if (
        playerChoiceDOM.classList.contains("rock") &&
        computerChoiceDOM.classList.contains("paper")
      ) {
        didWin = false;
      }
    }, 3000);
    if (choice.classList.contains("rock")) {
      createImage(playerChoiceDOM, "rock");
    } else if (choice.classList.contains("scissors")) {
      createImage(playerChoiceDOM, "scissors");
    } else if (choice.classList.contains("paper")) {
      createImage(playerChoiceDOM, "paper");
    }
  });
});

btn.addEventListener("click", () => {
  window.location.reload();
});

const createImage = (who, choice) => {
  who.innerHTML = `
  <img src="./images/icon-${choice}.svg" alt="${choice}" />
  `;
  if (choice === "paper") {
    who.classList.add("paper");
  } else if (choice === "rock") {
    who.classList.add("rock");
  } else if (choice === "scissors") {
    who.classList.add("scissors");
  }
};

resetBtn.addEventListener("click", () => {
  localStorage.clear();
  scoreDOM.textContent = score;
  window.location.reload();
});
