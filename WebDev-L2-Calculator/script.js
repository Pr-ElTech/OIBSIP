// ============================
// Calculator State
// ============================

let currentInput = "";
let previousInput = "";
let operator = "";
let history = [];

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
  currentInput += number;
  updateDisplay();
}

// ============================
// Decimal
// ============================

function appendDecimal() {
  if (!currentInput.includes(".")) {
    if (currentInput === "") {
      currentInput = "0.";
    } else {
      currentInput += ".";
    }

    updateDisplay();
  }
}

// ============================
// Clear
// ============================

function clearCalculator() {
  currentInput = "";
  previousInput = "";
  operator = "";

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

function chooseOperator(selectedOperator) {
  if (currentInput === "") return;

  previousInput = currentInput;
  currentInput = "";
  operator = selectedOperator;
}

// ============================
// Calculate
// ============================

function calculate() {
  if (
    previousInput === "" ||
    currentInput === "" ||
    operator === ""
  ) {
    return;
  }

  const prev = Number(previousInput);
  const current = Number(currentInput);

  let result;

  switch (operator) {
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
        operator = "";

        return;
      }

      result = prev / current;
      break;

    default:
      return;
  }

  addToHistory(
    `${previousInput} ${operator} ${currentInput} = ${result}`
  );

  currentInput = String(result);

  previousInput = "";

  operator = "";

  updateDisplay();
}

// ============================
// History
// ============================

function addToHistory(entry) {
  history.push(entry);

  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");

    li.textContent = item;

    historyList.prepend(li);
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

        case "backspace":
    backspace();
    break;
    }
  });
});

function backspace() {
  if (currentInput === "") return;

  currentInput = currentInput.slice(0, -1);

  updateDisplay();
}
// ============================
// Initial Display
// ============================

updateDisplay();