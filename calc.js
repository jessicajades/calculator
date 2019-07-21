let keys = document.getElementById("calculator-keys");
let calculator = document.getElementById("calculator");
let display = document.getElementById("calculator-display");

keys.addEventListener("click", function(event) {
  let key = event.target;
  let action = key.dataset.action;
  let displayNum = display.textContent;
  let previousKeyType = calculator.dataset.previousKeyType;
  Array.from(key.parentNode.children).forEach(k =>
    k.classList.remove("is-depressed")
  );
  if (key.tagName != "BUTTON") return;

  // number press
  if (!action) {
    if (displayNum === "0" || previousKeyType === "operator") {
      display.textContent = key.textContent;
      calculator.dataset.previousKeyType = "";
    } else {
      display.textContent = displayNum + key.textContent;
    }
    calculator.dataset.previousKeyType = "number";
  }

  // operator press
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    key.classList.add("is-depressed");
    calculator.dataset.previousKeyType = "operator";
    calculator.dataset.firstNum = displayNum;
    calculator.dataset.operator = action;
  }

  // decimal press
  if (action === "decimal") {
    if (previousKeyType === "operator") {
      display.textContent = "0.";
    } else if (!displayNum.includes(".")) {
      display.textContent = displayNum + ".";
    }
    calculator.dataset.previousKeyType = "decimal";
  }

  // equals press
  if (action === "equals") {
    let firstVal = calculator.dataset.firstNum;
    let operator = calculator.dataset.operator;
    let secondVal = displayNum;

    display.textContent = calculate(firstVal, secondVal, operator);

    calculator.dataset.previousKeyType = "equals";
  }

  // clear press
  if (action === "clear") {
    display.textContent = "0";
    calculator.dataset.previousKeyType = "clear";
  }
});

function calculate(n1, n2, operation) {
  let result = "";

  if (operation === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  }
  if (operation === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  }
  if (operation === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  }
  if (operation === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}
