document.addEventListener("keydown", (evt) => {
  const keyValue = evt.key;

  // Operands
  if (
    evt.key == 0 ||
    evt.key == 1 ||
    evt.key == 2 ||
    evt.key == 3 ||
    evt.key == 4 ||
    evt.key == 5 ||
    evt.key == 6 ||
    evt.key == 7 ||
    evt.key == 8 ||
    evt.key == 9
  ) {
    if (elDisplayText.textContent == 0) {
      elDisplayText.textContent = "";
    }

    elDisplayText.textContent += +keyValue;

    if (elDisplayText.textContent.includes(operator)) {
      secondOperand += keyValue;
    } else if (!elDisplayText.textContent.includes(operator)) {
      firstOperand += keyValue;
    }
  }

  // Operands
  if (
    evt.key === "/" ||
    evt.key === "*" ||
    evt.key === "-" ||
    evt.key === "+"
  ) {
    if (
      elDisplayText.textContent.includes("/") ||
      elDisplayText.textContent.includes("×") ||
      elDisplayText.textContent.includes("+") ||
      elDisplayText.textContent.includes("-")
    )
      return;

    if (
      !elDisplayText.textContent.includes("/") ||
      !elDisplayText.textContent.includes("×") ||
      !elDisplayText.textContent.includes("+") ||
      !elDisplayText.textContent.includes("-")
    ) {
      elDisplayText.textContent += keyValue;
      operator = keyValue;
    }
  }

  // Clear
  if (evt.key === "Backspace") {
    elDisplayText.textContent = 0;
    firstOperand = "";
    secondOperand = "";
    total = "";
  }

  // Calc
  if (evt.key === "Enter") {
    calcFunc();
  }
});
