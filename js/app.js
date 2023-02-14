const elDisplayText = document.querySelector("[data-result-text]");
const elClearBtn = document.querySelector("[data-clear]");
const elDotBtn = document.querySelector("[data-dot]");
const elEraseBtn = document.querySelector("[data-erase-num]");
const elOperatorBtns = document.querySelectorAll("[data-operators]");
const elOperandBtns = document.querySelectorAll("[data-button]");
const elCalcBtn = document.querySelector("[data-calc]");

let firstOperand = "";
let secondOperand = "";
let operator = null;
let total = null;

// Clear logic
elClearBtn.addEventListener("click", () => {
  elDisplayText.textContent = 0;
  firstOperand = "";
  secondOperand = "";
  total = "";
});

// Erase logic
elEraseBtn.addEventListener("click", () => {
  if (elDisplayText.textContent.length <= 1) {
    elDisplayText.textContent = "0";
  } else {
    elDisplayText.textContent = elDisplayText.textContent.replace(/.$/, "");
  }

  if (firstOperand.length <= 1) {
    firstOperand = "";
  } else {
    firstOperand = firstOperand.replace(/.$/, "");
  }

  if (secondOperand.length <= 1) {
    secondOperand = "";
  } else {
    secondOperand = secondOperand.replace(/.$/, "");
  }
});

// Dot logic
elDotBtn.addEventListener("click", (evt) => {
  const elTarget = elDotBtn.dataset.dot;

  if (!elDisplayText.textContent.includes(operator)) {
    if (!firstOperand.includes(elTarget)) {
      firstOperand += elTarget;
    } else return;
  }
  if (elDisplayText.textContent.includes(operator)) {
    if (!secondOperand.includes(elTarget)) {
      if (secondOperand === "") {
        elDisplayText.textContent += "0";
        secondOperand += 0 + elTarget;
      } else {
        secondOperand += elTarget;
      }
    } else return;
  }

  elDisplayText.textContent += elTarget;
});

// Operators
elOperatorBtns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const elTarget = evt.target.innerText;

    if (
      elDisplayText.textContent.includes("/") ||
      elDisplayText.textContent.includes("×") ||
      elDisplayText.textContent.includes("+") ||
      elDisplayText.textContent.includes("-")
    )
      return;

    operator = elTarget;
    elDisplayText.textContent += elTarget;
  });
});

// Operands
elOperandBtns.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    const elTarget = evt.target.innerText;

    if (
      elDisplayText.textContent == 0 &&
      !elDisplayText.textContent.includes(".")
    ) {
      elDisplayText.textContent = "";
    }

    elDisplayText.textContent += elTarget;

    if (elDisplayText.textContent.includes(operator)) {
      secondOperand += elTarget;
    } else if (!elDisplayText.textContent.includes(operator)) {
      firstOperand += elTarget;
    }
  });
});

// Calc logic
elCalcBtn.addEventListener("click", calcFunc);

// Calc function
function calcFunc() {
  if (operator === "/") {
    total = +firstOperand / +secondOperand;
  } else if (operator === "×") {
    total = +firstOperand * +secondOperand;
  } else if (operator === "-") {
    total = +firstOperand - +secondOperand;
  } else if (operator === "+") {
    total = +firstOperand + +secondOperand;
  }

  total = total.toFixed(3);

  if (total < 0) {
    const elAlertText = document.querySelector("[data-alert-text]");
    elAlertText.classList.remove("hidden");
    elDisplayText.textContent = +total;

    setTimeout(() => {
      elAlertText.classList.add("hidden");
    }, 2000);
    return;
  }

  elDisplayText.textContent = +total;
  firstOperand = +total;
  secondOperand = "";
}
