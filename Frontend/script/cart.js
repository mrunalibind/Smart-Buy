let cartProducts = document.getElementById("cart-container");
let cartData = JSON.parse(localStorage.getItem("cart-data"));

// let cartItems=JSON.parse(localStorage.getItem("cartItems"));

// cartData=[...cartData,...cartItems];
// console.log(cartData);


let shippingCharges = document.getElementById("shippingCharges");

const cartTotal = document.getElementById("cartTotal");
cartTotal.innerText = cartData.length;
if (cartData === null) {
  cartData = [];
}

showData(cartData);

function showData(data) {
  
  cartProducts.innerHTML=null;
  console.log(data);
  data.forEach((element, index) => {
    let card = document.createElement("div");

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");

    let image = document.createElement("img");
    image.setAttribute("src", element.image);

    let name = document.createElement("p");
    name.innerText = element.title;

//     let discountPrice = document.createElement("p");
//     discountPrice.innerText = "₹ " + element.discountPrice;

    let originalPrice = document.createElement("p");
    originalPrice.innerText = '₹ '+element.price;

    let qbtn = document.createElement("div");
    qbtn.setAttribute("id", "qbtn");

    let increase = document.createElement("button");
    increase.innerText = "+";

    let Quantity = document.createElement("span");
    Quantity.setAttribute("id", "Quantity");
    Quantity.innerText = 1;
    element.quantity = 1;

    let decrease = document.createElement("button");
    decrease.innerHTML = "-";

    let Delete = document.createElement("button");
    Delete.setAttribute("id", "deletebtn");
    Delete.innerText = "Delete";

    let i = Quantity.innerText;
    increase.addEventListener("click", () => {
      i++;
      Quantity.innerText = i;
      element.quantity = Quantity.innerText;
      Quantity.innerText = element.quantity;
      localStorage.setItem("cart-data", JSON.stringify(data));
      //   showData(cartData);
      sum();
    });
    decrease.addEventListener("click", () => {
      if (element.quantity > 1) {
        element.quantity--;
        i--;
        Quantity.innerText = element.quantity;
        localStorage.setItem("cart-data", JSON.stringify(data));
        // showData(cartData);
        sum();
      }
    });

    Delete.addEventListener("click", () => {
      
      data.splice(index, 1);
      localStorage.setItem("cart-data", JSON.stringify(data));
      console.log("After Deletion",data);
      showData(data);
      alert("Product is deleted")
      sum();
    });

    qbtn.append(increase, Quantity, decrease);
    imgdiv.append(image);
    card.append(imgdiv, name, originalPrice, qbtn, Delete);
    cartProducts.append(card);
  });
}

let x = 0;
function sum() {
  let total = document.getElementById("subtotal");
  let estimated1 = document.getElementById("estimated");

  let sum = 0;
  for (let i = 0; i < cartData.length; i++) {
    let q = +cartData[i].quantity;
    let p = +cartData[i].price;
    

    sum = sum + q * p;
    console.log(sum);
  }

  total.innerText = `₹ ${sum}`;

  if (sum >= 1000) {
    shippingCharges = 0;
  } else {
    shippingCharges = 25;
  }
  estimated1.innerText = `₹ ${sum + shippingCharges}`;
  x = sum + shippingCharges;
localStorage.setItem("totalPrice",sum + shippingCharges)
  console.log(x);
}
sum();

let alertsum = localStorage.getItem("totalsum");

// let checkoutbtn = document.getElementById("Checkout");
// checkoutbtn.addEventListener("click", () => {
//   console.log(x);
//   localStorage.setItem("totalsum", x);
// });
