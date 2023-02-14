const elThemeToggler = document.querySelector("[data-theme-toggler]");

elThemeToggler.addEventListener("click", () => {
  if (!document.body.classList.contains("dark-theme")) {
    document.body.classList.add("dark-theme");
    elThemeToggler.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-theme");
    elThemeToggler.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
});

// LocalStorage logic
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
  elThemeToggler.classList.add("dark");
} else {
  document.body.classList.remove("dark-theme");
  elThemeToggler.classList.remove("dark");
}
