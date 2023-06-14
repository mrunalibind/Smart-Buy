let url = "https://fakestoreapi.com"

fetch(`${url}/products`)
.then((res) => {
    return res.json();
}).then((data) => {
    showData(data)
    filterData(data)
}).catch((err) => {
    console.log(err)
})

//  All products containining here
let productContainer = document.getElementById('productContainer');
function showData(data) {
let product_list = `<div class="product-list" >
                ${data.map((item) =>
    productMaker(item.title, item.image, item.category, item.gender, item.price, item.rating, item.rating_count, item._id)
).join("")}

</div>`
productContainer.innerHTML = product_list;
}

//  Small card 
function productMaker(title, image, category, gender, price, rating, rating_count, itemID) {
let off = Math.floor((price - 1000) / price * 100)
let star = ""

for (let i = 1; i <= rating; i++) {
    star += `<span class="fa fa-star checked"></span>`
}
for (let i = 1; i <= (5 - rating); i++) {
    star += `<span class="fa fa-star"></span>`
}

let product = `<div class=product onclick=productDetails('${itemID}')>
    <span class="off">${100 - off} % off</span>
<img class="product_img" src=${image} alt="">
<h4 class="title">${title}</h4>
<p class="category"> Category : ${category}</p>

<p class="gender">Gender : ${gender}</p>
<p class="price">Price : ${price} ₹</p>
<p class="rating">Rating : ${star}</p>

<p class="rating_count">Review : ${rating_count}</p>
<button class="add" id="add" onclick=addToCart('${itemID}')>Add to card</button>
 <button class="buy" id="buy">Buy</button>
    
</div>`
return product;
}

//  add to cart function 
function addToCart(ID) {
if (!token) {
    message.innerText = `please login / register first to add in cart`
    toast.classList.add("active");
    setTimeout(() => {
        toast.classList.remove("active");
    }, 5000)
    // alert("please login / register first to add in cart")
    return;
}

event.stopPropagation()
}



