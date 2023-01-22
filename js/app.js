const elResultText = document.querySelector("[data-result-text]")
const elButtons = document.querySelectorAll("[data-button]")
const elOperators = document.querySelectorAll("[data-operator]")
const elClearBtn = document.querySelectorAll("[data-clear]")
const elCalcBtn = document.querySelector("[data-calc]")

let firstOperand = ""
let operator = null
let secondOperand = ""

elOperators.forEach(button => {
  button.addEventListener("click", (e) => {
    let elTarget = e.target.innerText
    if (elResultText.textContent.includes(elTarget)) return
    elResultText.textContent += elTarget
    operator = elTarget
  })
})

elButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    if (elResultText.textContent == "0") {
      elResultText.textContent = ""
    }
    elTarget = e.target.innerText
    if (elTarget !== "=") {
      elResultText.textContent += elTarget
    }
    if (elResultText.textContent.includes(operator)) {
      secondOperand += elTarget
      console.log(secondOperand)
    }
    if (!elResultText.textContent.includes(operator)) {
      firstOperand += elTarget
      console.log(firstOperand)
    }
  })
})

elCalcBtn.addEventListener("click", () => {
  let total = null
  if (operator === "×") {
    total = +firstOperand * +secondOperand
  } else if (operator === "/") {
    total = +firstOperand / +secondOperand
  } else if (operator === "-") {
    total = +firstOperand - +secondOperand
  } else if (operator === "+") {
    total = +firstOperand + +secondOperand
  }
  elResultText.textContent = total
})