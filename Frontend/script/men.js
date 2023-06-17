let token = JSON.parse(localStorage.getItem("token"));
let url = "https://fakestoreapi.com";

function fetchdata(queryParamString = null) {
  fetch(`${url}/products${queryParamString ? queryParamString : ""}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      displayData(data);
      filterData(data);
      document.getElementById("totalItem").innerText = data.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", () => {
  fetchdata(`?gender=male`);
});

//  All products containining here
let productContainer = document.getElementById("productContainer");

function displayData(data) {
  let product_list = `<div class="product-list" >
                ${data
                  .map((item) =>
                    productMaker(
                      item.title,
                      item.image,
                      item.category,
                      item.gender,
                      item.price,
                      item.rating,
                      item.review,
                      item.id
                    )
                  )
                  .join("")}

</div>`;
  productContainer.innerHTML = product_list;
}

//  card
function productMaker(
  title,
  image,
  category,
  gender,
  price,
  rating,
  review,
  itemID
) {
  let best = "";
  let star = "";

  if (price >= 150) {
    best = '<span class="best">Bestseller</span>';
  }
  for (let i = 1; i <= rating; i++) {
    star += `<span class="fa fa-star checked"></span>`;
  }
  for (let i = 1; i <= 5 - rating; i++) {
    star += `<span class="fa fa-star"></span>`;
  }

  let product = `<div class=product onclick=productDetails('${itemID}')>
        ${best}
    <img class="product_img" src=${image} alt="">
    <h4 class="title">${title}</h4>
    <p class="rating"> ${star} ${review}</p>
    <h2 class="price"> ₹${price} </h2>

    <p class="category"> Category : ${category}</p>

    <p class="gender">Gender : ${gender}</p>

    <p class="rating_count">Review : ${rating}</p>
    <button class="add" id="add" onclick=addToCart('${itemID}')>Add to cart</button>
        
    </div>`;
  return product;
}

function productDetails(id) {
  fetch(`${url}/products/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
  window.location.href = "#";
}
//  add to cart function
function addToCart(ID) {
  // Check if user is logged in
  const token = localStorage.getItem("token");

  if (token) {
    // User is logged in, make a POST request to /cart route
    fetch(`${url}/cart/${ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Item added to cart successfully.");
        } else {
          console.log("Failed to add item to cart.");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  } else {
    showAlert("Please login first.", "alert-error");
    window.location.href = "#";
  }
}

// filter and sorting functionality

let Rating = document.querySelectorAll(".rating-box input");
let Price = document.querySelectorAll(".price-box input");
let Material = document.querySelectorAll(".material-box input");
let Brand = document.querySelectorAll(".brand-box input");
let Category = document.querySelectorAll(".category-box input");

function filterData(product) {
  //  filter by brand
  for (let i = 0; i < Brand.length; i++) {
    Brand[i].addEventListener("change", () => {
      productContainer.innerHTML = "";
      let brandData = product.filter((element) => {
        if (element.brand == Brand[i].value) {
          return element;
        }
      });
      displayData(brandData);
    });
  }

  // filter by category
  for (let i = 0; i < Category.length; i++) {
    Category[i].addEventListener("change", () => {
      productContainer.innerHTML = "";
      let categoryData = product.filter((element) => {
        if (element.category == Category[i].value) {
          return element;
        }
      });
      displayData(categoryData);
    });
  }

  //  filter by material

  for (let i = 0; i < Material.length; i++) {
    Material[i].addEventListener("change", () => {
      productContainer.innerHTML = "";
      let materialData = product.filter((element) => {
        if (element.material == Material[i].value) {
          return element;
        }
      });
      displayData(materialData);
    });
  }

  // fiter by price limit
  for (let i = 0; i < Price.length; i++) {
    Price[i].addEventListener("change", () => {
      productContainer.innerHTML = "";
      let filteredProducts = [];

      if (Price[i].checked) {
        if (Price[i].value == 500) {
          filteredProducts = product.filter((element) => element.price <= 50);
        } else if (Price[i].value == 1000) {
          filteredProducts = product.filter(
            (element) => element.price > 50 && element.price <= 100
          );
        } else if (Price[i].value == 1500) {
          filteredProducts = product.filter(
            (element) => element.price > 1000 && element.price <= 1500
          );
        } else if (Price[i].value == 2000) {
          filteredProducts = product.filter(
            (element) => element.price > 1500 && element.price <= 2000
          );
        } else if (Price[i].value == 2100) {
          filteredProducts = product.filter((element) => element.price > 2100);
        }
      } else {
        // Checkbox is unchecked, display all products
        filteredProducts = product;
      }

      displayData(filteredProducts);
    });
  }

  //by rating
  for (let i = 0; i < Rating.length; i++) {
    Rating[i].addEventListener("change", () => {
      productContainer.innerHTML = "";
      let raitngData = product.filter((element) => {
        if (element.rating == Rating[i].value) {
          return element;
        }
      });
      displayData(raitngData);
    });
  }

  let sortBy = document.getElementById("sort");
  sortBy.addEventListener("change", () => {
    if (sortBy.value == "priceLowToHigh") {
      let data = product.sort((a, b) => {
        return a.price - b.price;
      });
      displayData(data);
    } else if (sortBy.value == "priceHighToLow") {
      let data = product.sort((a, b) => {
        return b.price - a.price;
      });
      displayData(data);
    } else if (sortBy.value == "top") {
      fetchdata(`?rating`);
    }
  });
}

//alert

function showAlert(message, type) {
  const alertContainer = document.createElement("div");
  alertContainer.className = "alert-container";

  const alertElement = document.createElement("div");
  alertElement.className = `alert ${type}`;

  const alertMessage = document.createElement("span");
  alertMessage.textContent = message;

  const alertClose = document.createElement("span");
  alertClose.className = "alert-close";
  alertClose.innerHTML = "&times;";
  alertClose.addEventListener("click", function () {
    alertContainer.remove();
  });

  alertElement.appendChild(alertMessage);
  alertElement.appendChild(alertClose);
  alertContainer.appendChild(alertElement);

  document.body.appendChild(alertContainer);
}
