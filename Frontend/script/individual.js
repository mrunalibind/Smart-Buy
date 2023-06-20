let token = localStorage.getItem("token");
let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
let main = document.querySelector('.indi');

const cartTotal = document.getElementById("cartTotal");
let ID = JSON.parse(localStorage.getItem("product")) || [];

function fetchData() {
    fetch(`https://dark-red-hippopotamus-toga.cyclic.app/product/${ID}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        appendToDom(data.title, data.price, data.image, data.brand, data._id, data.material, data.category, data.rating, data.review)
      })
  }
  fetchData();
  function appendToDom(title, price, image, brand, id, gender, category, rating, review) {
    let best = "";
    let star = ""

    if(rating == 5) {
        best = '<span class="best">Bestseller</span>';
    }
    for (let i = 1; i <= rating; i++) {
        star += `<span class="fa fa-star checked"></span>`
    }
    for (let i = 1; i <= (5 - rating); i++) {
        star += `<span class="fa fa-star"></span>`
    }
    main.innerHTML = `<div class="imagediv">
      ${best}
      <img src="${image}" alt=""/>
    </div>
    <div class="productdetails">
      <h3>Brand: ${brand}</h3>
      <h3>${title}</h3>
      <p> <span id="span"> ${star}</span> ${review}</p><hr>
      <p id="priice">₹${price}</p>
      
      <div class="selectcolo">
        <p>Select Color</p>
        <div>
          <div class="red"></div>
          <div class="blue"></div>
          <div class="yellow"></div>
        </div>
      </div>
      <div class="selectsize">
        <p>Select Size</p>
        <div>
          <div class="S">S</div>
          <div class="M">M</div>
          <div class="L">L</div>
          <div class="XL">XL</div>
          <div class="XXL">XXL</div>
        </div>
      </div>
      <div class="btns">
        <div id="addtocart" class="addtocard">
          <i class="fa-solid fa-bag-shopping"></i> ADD TO BAG
        </div>
        <div id="addtowishlist" class="wishlist">
          <i class="fa-solid fa-heart"></i> Go To Cart
        </div>
      </div>
      <div class="offer">
        <p id="extra">Extra Savings</p>
        <div>
          <div class="right">
            <p>
            Save 10% on this item when you purchase 1 or more of this category
            </p>
          </div>
        </div>
      </div>
    </div>`
    document.getElementById('addtocart').addEventListener('click', () => {
        cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
        const token = localStorage.getItem("token");

        if (!token) {
          showAlert("Please login first.", "alert-error");
          setTimeout(() => {
              window.location.href = "../html/login.html";
          }, 4000)        
        }
        else {
          let obj = {
            _id: id,
            image: image,
            brand: brand,
            price: price,
            gender: gender,
            category: category,
            title: title, 
            review: review,
            rating: rating
          }
          if (checkDuplicate(obj)) {
            showAlert("Product already in the cart", "alert-error");
          }
          else {
            cartData.push({ ...obj, quantity: 1 });
            localStorage.setItem("cart-data", JSON.stringify(cartData));
            cartTotal.innerText = cartData.length;
            showAlert("Product added to cart", "alert-success");
          }
        }
    })

    document.getElementById('addtowishlist').addEventListener('click', () => {
        window.location.href = "../html/cart.html";
    });

    }

    //to check duplicate products

function checkDuplicate(element) {
    for (let i = 0; i < cartData.length; i++) {
        if (cartData[i]._id == element._id) {
            return true;
        }
    }
    return false;
}