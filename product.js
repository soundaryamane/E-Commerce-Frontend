const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const product = products.find((p) => p.id === id);

const container = document.getElementById("productDetails");
if (product) {
    container.innerHTML = `
    <img src="${product.image}" style="width: 300px;" />
    <h2>${product.title}</h2>
    <p><strong>Price:</strong> ₹${product.price}</p>
    <p>${product.description}</p>
    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    <button class="btn" onclick="addToWishlist(${product.id})">❤️ Wishlist</button>
    `;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantities = JSON.parse(localStorage.getItem("quantities")) || {};

    if (!cart.includes(id)) {
        cart.push(id);
    }

    // If product is already in cart, increase quantity
    quantities[id] = quantities[id] ? quantities[id] + 1 : 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantities", JSON.stringify(quantities));

    alert("Product added to cart!");
}

function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(id)) wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
}
