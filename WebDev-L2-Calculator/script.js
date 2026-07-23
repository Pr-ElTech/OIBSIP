let currentInput = "";
let previousInput = "";
let operator = "";
let history = [];

const display = document.getElementById("display");
const buttons = document.querySelectorAll("buttons");
const historyList = document.getElementById("historyListy");
const button = document.getElementById("button");

function updateDisplay() {
  display.textContent = currentInput || "0";
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     console.log(butSton.textContent);
//   });
// });

const uiUpdate = () => {
  display.textContent = button;
};
