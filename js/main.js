// Calculator Displayida chiqarish uchun
let display = document.getElementById("display");

// bosilgan tugmalardagi barcha belgilarni o'zlashtirish uchun
let num1 = "";

// day night rang rejimlari uchun
let dayNight = document.getElementById("dayNight");
let content_wrapper = document.getElementById("content__wrapper");
let calc__wrapper = document.getElementById("calc__wrapper");
let ul = document.getElementById("ul");
let dayType = "Day";

// Qavslar logikasi uchun
let newNum1Quote = "";

function calc(n) {
  //boshida faqat - (minus) belgisini qo'ya olish logikasi
  if (
    (num1 === "" && n === "+") ||
    (num1 === "" && n === "*") ||
    (num1 === "" && n === "/")
  ) {
    let zero = "0" + n;
    n = zero;
  }

  // nuqtaning barcha holatlardagi logikasi logikasi
  if (n === ".") {
    if (num1[num1.length - 1] === ".") {
      n = "";
    } else if (
      num1[num1.length - 1] === "+" ||
      num1[num1.length - 1] === "-" ||
      num1[num1.length - 1] === "*" ||
      num1[num1.length - 1] === "/" ||
      num1 === ""
    ) {
      num1 += "0";
    }
  }

  // x! ya'ni o'zigacha bo'lgan sonlar ko'paytmasi belgisini ketma-ket faqat bir marta chiqarish kichik logikasi
  n === "!"
    ? num1[num1.length - 1] === "!" ||
      num1[num1.length - 1] === "-" ||
      num1[num1.length - 1] === "+" ||
      num1[num1.length - 1] === "/" ||
      num1[num1.length - 1] === "*"
      ? (n = "")
      : null
    : null;
  num1 === "" && n === "!" ? (n = "0") : null;

  // faqat bir marta arifmetik belgi qo'ya olish logikasi
  if (n === "+" || n === "-" || n === "/" || n === "*") {
    if (
      num1[num1.length - 1] === "+" ||
      num1[num1.length - 1] === "-" ||
      num1[num1.length - 1] === "/" ||
      num1[num1.length - 1] === "*"
    ) {
      let newNum1 = "";
      for (let i = 0; i < num1.length; i++) {
        i === num1.length - 1 ? (newNum1 += "") : (newNum1 += num1[i]);
      }
      num1 = newNum1;
    }
  }

  // Qavslar kichik logikasi
  if (n === "rightQuote") {
    n = ")";
  }
  if (n === "leftQuote") {
    n = "(";
  }

  num1 += n;

  displayFontSize();
  display.textContent = num1;
}

function displayFontSize() {
  if (display.textContent.length >= 18 && display.textContent.length < 28) {
    display.style.fontSize = "20px";
    return;
  }
  if (display.textContent.length >= 27 && display.textContent.length < 34) {
    display.style.fontSize = "14px";
    return;
  }
  if (display.textContent.length >= 33 && display.textContent.length < 56) {
    display.style.fontSize = "10px";
    return;
  }
  if (display.textContent.length >= 55) {
    display.style.fontSize = "5px";
    return;
  }
  display.style.fontSize = "2em";
}

function clearClick(n) {
  if (n === "C") {
    num1 = display.textContent = "0";
  } else {
    let num2 = "";
    for (let i = 0, j = 1; j < num1.length; i++, j++) {
      num2 += num1[i];
    }
    num1 = num2;
    display.textContent = num1;
    if (num1 === "") {
      display.textContent = "0";
    }
  }
  displayFontSize();
}

function displayClick() {
  let s = 0;
  let oldSym = true;
  let j = false;

  for (let i = 0; i < num1.length; i++) {
    num1[i] === "(" || num1[i] === ")" ? null : (newNum1Quote += num1[i]);
  }

  newNum1Quote === "" ? null : (num1 = newNum1Quote);
  newNum1Quote = "";
  let arr = num1.split("");

  let newArr = ["", "", ""];

  arr = arr.map((i, idx) => {
    if (idx !== 0) {
      if (
        (i === "+" && oldSym && !j) ||
        (i === "-" && oldSym && !j) ||
        (i === "*" && oldSym && !j) ||
        (i === "/" && oldSym && !j)
      ) {
        s++;
        oldSym = false;
      }
    }
    newArr[s] += i;
    if (!oldSym) {
      s += 1;
      oldSym = true;
    }
    if (i === "+" || i === "-" || i === "*" || i === "/") {
      j = true;
    } else j = false;
  });

  let a = newArr[0];
  let c = newArr[1];
  let b = newArr[2];

  // x! ya'ni o'zigacha bo'lgan sonlar ko'paytmasi logikasi
  let newValue = "";

  function xGachaSon(n) {
    for (let i = 0; i < n.length - 1; i++) {
      newValue += n[i];
    }
    newValue = Number(newValue);
    for (let i = 0, j = 1; i < newValue; i++) {
      j *= i + 1;
      n = j;
    }
    newValue = "";
    return n;
  }

  if (a.includes("!")) {
    a = String(xGachaSon(a));
  }
  if (b.includes("!")) {
    b = String(xGachaSon(b));
  }

  if (b !== "") {
    // va oxirida hisoblash
    if (c === "+") num1 = Number(a) + Number(b);
    else if (c === "-") num1 = Number(a) - Number(b);
    else if (c === "*") num1 = Number(a) * Number(b);
    else if (c === "/") num1 = Number(a) / Number(b);
  } else {
    num1 = a;
  }

  //
  displayFontSize();
  display.textContent = num1;
}

function dayClick() {
  if (dayType === "Day") {
    dayType = "Night";
    dayNight.classList.add("fa-moon");
    dayNight.classList.remove("fa-sun");

    content_wrapper.classList.add("night_content");
    calc__wrapper.classList.add("nightCalc");
    ul.classList.add("buttonNight");
  } else {
    dayType = "Day";
    dayNight.classList.add("fa-sun");
    dayNight.classList.remove("fa-moon");

    content_wrapper.classList.remove("night_content");
    calc__wrapper.classList.remove("nightCalc");
    ul.classList.remove("buttonNight");
  }
}
