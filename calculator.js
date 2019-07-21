// press options:
// number key (0-9)
// operator key (+, -, ×, ÷)
// decimal key
// equals key
// clear key

// instructions
// listen for all keypresses
// determine the type of key that is pressed

// keys.addEventListener("click", function(event) {
//   let key = event.target;
//   let action = key.dataset.action;
//   if (key.tagName != "BUTTON") return;
//   if (!action) {
//     console.log("number key");
//   }
//   if (
//     action === "add" ||
//     action === "subtract" ||
//     action === "multiply" ||
//     action === "divide"
//   ) {
//     console.log("operator key");
//   }
//   if (action === "equals") {
//     console.log("equals key");
//   }
//   if (action === "decimal") {
//     console.log("decimal key");
//   }
//   if (action === "clear") {
//     console.log("clear key");
//   }
// });

// pressing a number key
// if the current number is zero, change default number to keypress
// if there is a number greater than 0, append number press to number

// we need to know:
// the current displayed number
// the number that was pressed

// operator key
// when clicked, it should stay highlighted so you know it is active

// after hitting an operator, you click another number
// the new number should replace the current number
// the operator key should release its pressed state

// Array.from(key.parentNode.children).forEach(k =>
//   k.classList.remove("is-depressed")
// );

let keys = document.getElementById("calculator-keys");
let display = document.getElementById("calculator-display");
let calculator = document.getElementById("calculator");

keys.addEventListener("click", function(event) {
  let key = event.target;
  let action = key.dataset.action;
  if (key.tagName != "BUTTON") return;
  let keyContent = key.textContent;
  let displayNum = display.textContent;
  Array.from(key.parentNode.children).forEach(k =>
    k.classList.remove("is-depressed")
  );
  // number keypress
  if (!action) {
    if (
      displayNum === "0" ||
      calculator.dataset.previousKeyType === "operator"
    ) {
      display.textContent = keyContent;
      calculator.dataset.previousKeyType = "";
    } else {
      display.textContent = displayNum + keyContent;
    }
    calculator.dataset.previousKeyType = "number";
  }
  // decimal press
  if (action === "decimal") {
    if (calculator.dataset.previousKeyType === "operator") {
      display.textContent = "0.";
    } else if (!displayNum.includes(".")) {
      display.textContent = displayNum + ".";
    }
    calculator.dataset.previousKeyType = "decimal";
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
  // equals press
  if (action === "equals") {
    let firstNum = calculator.dataset.firstNum;
    let secondNum = displayNum;
    let operator = calculator.dataset.operator;

    display.textContent = calculate(firstNum, operator, secondNum);

    calculator.dataset.previousKeyType = "equals";
  }
  // clear press
  if (action === "clear") {
    display.textContent = 0;
    calculator.dataset.previousKeyType = "clear";
  }
});

// equals key
// when you press, it should calculate a result based on 3 items:
// number #1
// operator
// number #2
// after calculation, it should replace the displayed value

function calculate(n1, op, n2) {
  let result = "";

  if (op === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (op === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (op === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (op === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}
