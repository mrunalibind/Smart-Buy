
let token = localStorage.getItem("token");
let cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
const cartTotal = document.getElementById("cartTotal");
let paginationWrapper = document.querySelector(".pagination-wrapper");

let url = "https://dark-red-hippopotamus-toga.cyclic.app";

function fetchdata(queryParamString = null) {
    fetch(`${url}/product${queryParamString ? queryParamString : ""}`)
    .then((res) => {
        let totalCount = +25;
        let totalPages = Math.ceil(totalCount / 5)
        console.log(totalCount, totalPages)
        renderPagination(totalPages);
        return res.json();
    }).then((data) => {
        displayData(data)
        filterData(data)
        document.getElementById("totalItem").innerText = data.length
    }).catch((err) => {
        console.log(err)

    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", () => {

    fetchdata(`?gender=Male`);
})



//  All products containining here
let productContainer = document.getElementById("productContainer");

function displayData(data) {

    const container = document.createElement('div');
    container.classList.add('product-list'); // Add the "product-list" class to the container

    data.forEach(item => {
        const productElement = productMaker(item.title, item.image,item.category, item.brand, item.material , item.price, item.rating, item.review, item._id);
        container.appendChild(productElement);
    });

    productContainer.innerHTML = '';
    productContainer.appendChild(container );
}

//  card 
function productMaker(title, image, category, brand, material, price, rating, review, itemID) {
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

    let product = `<div class=product >
        ${best}
    <div class="image-container"><img class="product_img" src=${image} alt=""></div>
    <h4 class="title">${title}</h4>
    <p class="rating"> ${star} ${review}</p>
    <h2 class="price"> ₹${price} </h2>

    <p class="brand">Brand : ${brand}</p>
    <p class="category">Category : ${category}</p>

    <p class="material"> Material : ${material}</p>


    <p class="rating_count">Review : ${rating}</p>
    <button class="add" id="add" onclick=addToCart('${itemID}')>Add to cart</button>
        

    </div>`


    const productCard = document.createElement("div");
    productCard.innerHTML = product;
  
    const addToCartButton = productCard.querySelector(".add");
    addToCartButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const token = localStorage.getItem("token");
      if (token) {
        const obj = {
          _id: itemID,
          image: image,
          brand: brand,
          price: price,
          category: category,
          title: title,
          rating: rating,
          review: review
        };
  
        if (checkDuplicate(obj)) {
          showAlert("Product already in the cart", "alert-error");
        } else {
          cartData = JSON.parse(localStorage.getItem("cart-data")) || [];
          cartData.push({ ...obj, quantity: 1 });
          localStorage.setItem("cart-data", JSON.stringify(cartData));
          cartTotal.innerText = cartData.length;
          showAlert("Product added to cart", "alert-success");
        }
      } else {
        showAlert("Please login first.", "alert-error");
        setTimeout(() => {
            window.location.href = "../html/login.html";
        }, 4000)
      }
    });
  
    productCard.addEventListener("click", () => {
        localStorage.setItem('product', itemID)
      window.location.href = "../html/individual.html";
    });
  
    return productCard;
    
}

//pagination

function renderPagination(numOfPages) {
    console.log('i am invoked ', numOfPages)
  
    function asListOfButtons() {
      let arr = [];
      for (let i = 1; i <=numOfPages; i++) {
        arr.push(getAsButton(i));
      }
      console.log(arr)
      return arr.join('');
    }
  
    // paginationWrapper.innerHTML = '';
    paginationWrapper.innerHTML = `
      <div>  
        ${asListOfButtons()}  
      </div>
    `
  
    // whenever this line executes, are we sure that the buttons are present on the dom? yes
  
    let paginationButtons = document.querySelectorAll(".pagination-button");
    for (let btn of paginationButtons) {
      btn.addEventListener('click', (e) => {
        let dataId = e.target.dataset.id;
        fetchdata(`?gender=Male&page=${+dataId}&limit=7`);
      })
    }
}
  
  // id=1
  // <button class="pagination-button" data-id="1">1</button>
  
  function getAsButton(pageNumber) {
    return `<button class="pagination-button" data-id=${pageNumber}>${pageNumber}</button>`
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
            productContainer.innerHTML = ""
            let brandData = [];
            if(Brand[i].checked) {
                brandData = product.filter((element) => {

                    if (element.brand == Brand[i].value) {
                        return element
                    }
                })
            } else {
                brandData = product;
            }
            
            displayData(brandData)

        })
    }


    // filter by category
    for (let i = 0; i < Category.length; i++) {

        Category[i].addEventListener("change", () => {
            productContainer.innerHTML = ""
            let categoryData = [];
            if(Category[i].checked) {
                categoryData = product.filter((element) => {

                    if (element.category == Category[i].value) {
                        return element
                    }
                })
            } else {
                categoryData = product;
            }
            
            displayData(categoryData)

        })
    }

    //  filter by material

    for (let i = 0; i < Material.length; i++) {

        Material[i].addEventListener("change", () => {
            productContainer.innerHTML = ""
            let materialData = [];
            if(Material[i].checked) {
                materialData = product.filter((element) => {

                    if (element.material == Material[i].value) {
                        return element
                    }
                })
            } else {
                materialData = product;
            }
            
            displayData(materialData)
        })
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


    for (let i = 0; i < Rating.length; i++) {
        Rating[i].addEventListener("change", () => {
            productContainer.innerHTML = ""
            let raitngData = [];
                if(Rating[i].checked) {
                    raitngData = product.filter((element) => {
                    if (element.rating == Rating[i].value) {
                        return element
                    }})
                 
                } else {
                    raitngData = product;
                }
                displayData(raitngData);

        })
    }

    
    let sortBy = document.getElementById('sort');
    sortBy.addEventListener("change", () => {
        if (sortBy.value == "priceLowToHigh") {
            let data = product.sort((a, b) => {
                return a.price - b.price
            });
            displayData(data)
        }
        else if (sortBy.value == "priceHighToLow") {

            let data = product.sort((a, b) => {
                return b.price - a.price
            });
            displayData(data)
        }
        else if (sortBy.value == "top") {
            fetchdata(`?gender=Female&sortBy=rating`)
        }

    })
}
    
    
   //  search functionality 

   let searchBox = document.getElementById("search-box")
   let searchBtn = document.getElementById("search-button")


   searchBox.addEventListener("keyup", searchData)
   searchBtn.addEventListener("click", searchData)

   let timeOut;
   let count = 0;


function searchData(event) {
   if (event.key === "Enter") {
       event.preventDefault();
       searchBtn.click();
       fetch(`${url}/product?gender=Male&search=${searchBox.value}`)
           .then((res) => {
               return res.json();
           }).then((data) => {
               displayData(data)
               filterData(data)
           }).catch((err) => {
               // alert(`Nothing found. Please try something else !  `)
               console.log(err)
           })
   }
   else {
       clearTimeout(timeOut)
       timeOut = setTimeout(function () {
           fetch(`${url}/product?gender=Male&search=${searchBox.value}`)
               .then((res) => {
                   return res.json();
               }).then((data) => {
                   displayData(data)
                   filterData(data)
               }).catch((err) => {
                   // alert(`Nothing found. Please try something else !  `)
                   console.log(err)
               })
       }, 1000);
   }
}



