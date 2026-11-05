const expression = document.querySelector(".expression");
const result = document.querySelector(".result");

let first = "", operator = "", second = "", calculated = false;

// Each operator maps to what it does
const operations = {
  "+": (a, b) => a + b,
  "−": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

// Clear everything
function reset() {
  first = operator = second = "";
  calculated = false;
}

// Update the calculator screen
function display() {
  expression.textContent = `${first} ${operator} ${second}`;
  result.textContent = second || first || "0";
}

// Perform the calculation and return it as a string
function calculate() {
  return String(operations[operator](Number(first), Number(second)));
}

// Listen for button clicks
document.querySelectorAll(".key").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent.trim();

    if (value === "AC") {
      reset();
    } else if (value === "=") {
      if (!first || !operator || !second) return;

      if (operator === "÷" && Number(second) === 0) {
        reset();
        result.textContent = "Error";
        expression.textContent = "";
        return;
      }

      first = calculate();
      second = "";
      operator = "";
      calculated = true;
    } else if (button.classList.contains("key-operator")) {
      if (!first) return;

      if (second) {
        first = calculate();
        second = "";
      }

      operator = value;
      calculated = false;
    } else {
      // Starting a new number after "=" clears the old result
      if (calculated) {
        first = "";
        calculated = false;
      }

      // Block a second decimal point in the current number
      if (value === "." && (operator ? second : first).includes(".")) return;

      if (operator) second += value;
      else first += value;
    }

    display();
  });
});

display();