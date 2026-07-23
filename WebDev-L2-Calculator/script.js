// ============================
// Calculator State
// ============================

let currentInput = "";
let previousInput = "";
let currentOperator = "";
let history = [];
let resultDisplayed = false;

// ============================
// DOM Elements
// ============================

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const historyList = document.getElementById("history-list");

// ============================
// Display
// ============================

function updateDisplay() {
  display.value = currentInput || "0";
}

// ============================
// Number Input
// ============================

function appendNumber(number) {
  // Start a new calculation after "="
  if (resultDisplayed) {
    currentInput = "";
    previousInput = "";
    currentOperator = "";
    resultDisplayed = false;
  }

  currentInput += number;
  updateDisplay();
}

// ============================
// Decimal
// ============================

function appendDecimal() {
  if (resultDisplayed) {
    currentInput = "0.";
    resultDisplayed = false;
    updateDisplay();
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput = currentInput === "" ? "0." : currentInput + ".";
    updateDisplay();
  }
}

// ============================
// Clear
// ============================

function clearCalculator() {
  currentInput = "";
  previousInput = "";
  currentOperator = "";
  resultDisplayed = false;

  updateDisplay();
}

// ============================
// Backspace
// ============================

function backspace() {
  if (resultDisplayed) return;

  if (currentInput === "") return;

  currentInput = currentInput.slice(0, -1);

  updateDisplay();
}

// ============================
// Toggle Sign
// ============================

function toggleSign() {
  if (currentInput === "") return;

  currentInput = String(Number(currentInput) * -1);

  updateDisplay();
}

// ============================
// Percentage
// ============================

function percentage() {
  if (currentInput === "") return;

  currentInput = String(Number(currentInput) / 100);

  updateDisplay();
}

// ============================
// Choose Operator
// ============================

function chooseOperator(operator) {
  if (currentInput === "") return;

  // Allow continuing calculation after "="
  resultDisplayed = false;

  previousInput = currentInput;
  currentInput = "";
  currentOperator = operator;
}

// ============================
// Calculate
// ============================

function calculate() {
  if (
    previousInput === "" ||
    currentInput === "" ||
    currentOperator === ""
  ) {
    return;
  }

  const prev = Number(previousInput);
  const current = Number(currentInput);

  let result;

  switch (currentOperator) {
    case "+":
      result = prev + current;
      break;

    case "-":
      result = prev - current;
      break;

    case "*":
      result = prev * current;
      break;

    case "/":
      if (current === 0) {
        display.value = "Cannot divide by 0";

        currentInput = "";
        previousInput = "";
        currentOperator = "";
        resultDisplayed = false;

        return;
      }

      result = prev / current;
      break;

    default:
      return;
  }

  addToHistory(
    `${previousInput} ${currentOperator} ${currentInput} = ${result}`
  );

  currentInput = String(result);
  previousInput = "";
  currentOperator = "";
  resultDisplayed = true;

  updateDisplay();
}

// ============================
// History
// ============================

function addToHistory(entry) {
  history.unshift(entry);

  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// ============================
// Button Events
// ============================

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
      case "number":
        appendNumber(value);
        break;

      case "decimal":
        appendDecimal();
        break;

      case "clear":
        clearCalculator();
        break;

      case "backspace":
        backspace();
        break;

      case "toggle-sign":
        toggleSign();
        break;

      case "percent":
        percentage();
        break;

      case "operator":
        chooseOperator(value);
        break;

      case "equal":
        calculate();
        break;
    }
  });
});

// ============================
// Initial Display
// ============================

updateDisplay();

const clearHistoryBtn = document.getElementById("clear-history");

clearHistoryBtn.addEventListener("click", clearHistory);

function clearHistory() {
    history = [];

    historyList.innerHTML = `
        <li>No calculations yet.</li>
    `;
}