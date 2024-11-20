const buttons = document.querySelectorAll("button");
const previousInput = document.querySelector(".previous-input");
const currentInput = document.querySelector(".current-input");

let currentOperand = "";
let previousOperand = "";
let operation = null;
let isError = false;

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        result = "Cannot divide by 0";
        isError = true;
        disableButtons();
      } else {
        result = prev / curr;
      }
      break;
    default:
      return;
  }

  if (!isError) {
    currentOperand = result.toString().slice(0, 15);
    operation = null;
    previousOperand = "";
  } else {
    currentOperand = result;
  }
}

function updateDisplay() {
  currentInput.textContent = currentOperand || previousOperand;
  if (operation !== null && previousOperand !== "") {
    previousInput.textContent = `${previousOperand} ${operation}`;
  } else {
    previousInput.textContent = "";
  }
}

function disableButtons() {
  buttons.forEach(btn => {
    if (!btn.classList.contains("clear")) {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
  });
}

function enableButtons() {
  buttons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("disabled");
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("number")) {
      if (currentOperand.length < 13) {
        currentOperand += btn.textContent;
      }
    }

    if (btn.classList.contains("dot")) {
      if (!currentOperand.includes(".") && currentOperand.length < 13) {
        currentOperand += currentOperand === "" ? "0." : ".";
      }
    }

    if (btn.classList.contains("operation")) {
      if (currentOperand === "") return;

      if (previousOperand !== "" && operation !== null) {
        calculate();
      }

      previousOperand = currentOperand;
      operation = btn.textContent;
      currentOperand = "";
    }

    if (btn.classList.contains("equals")) {
      if (previousOperand === "" || currentOperand === "" || operation === null)
        return;

      calculate();
      previousInput.textContent = "";
    }

    if (btn.classList.contains("delete")) {
      currentOperand = currentOperand.slice(0, -1);
    }

    if (btn.classList.contains("clear")) {
      currentOperand = "";
      previousOperand = "";
      operation = null;
      isError = false;
      enableButtons();
    }

    updateDisplay();
  });
});
