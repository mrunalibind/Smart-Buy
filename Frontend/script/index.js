// *************************** UserName ****************************
const user = document.getElementById("username");
const name = localStorage.getItem("name") || "Login First";
user.innerText = "Hello," + "\n" + name;

// ******************************** Cross Button ************************************
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const body = document.querySelector("body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#close").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
