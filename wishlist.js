const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const container = document.getElementById("wishlistContainer");

if (wishlist.length === 0) {
    container.innerHTML = "<p>Your wishlist is empty.</p>";
} else {
    wishlist.forEach((id) => {
        const product = products.find((p) => p.id === id);
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
        <img src="${product.image}" />
        <h4>${product.title}</h4>
        <p>₹${product.price}</p>
        <button class="btn" onclick="moveToCart(${id})">Move to Cart</button>
        `;
        container.appendChild(card);
    });
}

function moveToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(id)) cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));

    const updatedWishlist = wishlist.filter((item) => item !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    location.reload();
}