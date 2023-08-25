document.addEventListener("keydown", evt => {
  const keyValue = evt.key;

  // Operands
  if (evt.key <= 0 && evt.key >= 9) {
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
  if (evt.key === "/" || evt.key === "*" || evt.key === "-" || evt.key === "+") {
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

  // Erase
  if (evt.key === "Backspace") {
    numErase();
  }

  // Clear
  if (evt.key === "с") {
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
