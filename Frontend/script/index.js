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
// ********************** CONTAINER 5 PRODUCTS (TOP DEALS)*************************************
let cont5Products = document.getElementById("cont5-products");

fetch("../script/container5.json")
  .then((res) => {
    return res.json();
  })
  .then((actualData) => {
    // console.log(actualData);
    showData(actualData);
  })
  .catch((err) => {
    console.log(err);
  });

function showData(data) {
  data.forEach((element, index) => {
    let card = document.createElement("div");

    let image = document.createElement("img");
    image.setAttribute("src", element.image);

    let name = document.createElement("p");
    name.innerText = element.name;

    let discountPrice = document.createElement("p");
    discountPrice.innerText = "₹" + element.discountPrice;

    let originalPrice = document.createElement("s");
    originalPrice.innerText = "₹" + element.originalPrice;

    let button = document.createElement("button");
    button.innerText = "Add to Cart";

    button.addEventListener("click", () => {
      let cartData = JSON.parse(localStorage.getItem("cart-data"));
      if (cartData === null) {
        cartData = [];
      }

      let isAlreadyInCart = false;

      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].id === element.id) {
          isAlreadyInCart = true;
          break;
        }
      }
      if (isAlreadyInCart === true) {
        alert("Product is already in Cart.");
      } else {
        cartData.push(element);
        localStorage.setItem("cart-data", JSON.stringify(cartData));
        alert("Product successfully added to Cart.");
      }
    });

    card.append(image, name, discountPrice, originalPrice, button);
    cont5Products.append(card);
  });
}
