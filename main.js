const productList = document.getElementById("productList");

products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
    <img src="${p.image}" alt="${p.title}">
    <h4>${p.title}</h4>
    <p>₹${p.price}</p>
    <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    <button class="btn" onclick="addToWishlist(${p.id})">❤️</button>
    <a href="product.html?id=${p.id}">View Details</a>
    `;
    productList.appendChild(card);
});

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.includes(id)) cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.includes(id)) wishlist.push(id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to wishlist!");
}

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// Initial render with all products 
renderProducts(products);

// Function to render products dynamically 
function renderProducts(list) {
    productList.innerHTML = ""; // Clear container

    list.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML =`
        <img src="${product.image}" alt="${product.title}" class="product-img" />
        <h4>${product.title}</h4>
        <p>₹${product.price}</p>
        <p class="category">${product.category}</p>
        <div class="card-actions">
        <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
        <button class="btn"
        onclick="addToWishlist(${product.id})" class="btn">❤️</button>
        <a href="product.html?id=${product.id}" class="btn">View-details</a>
        </div>
        `;

        productList.appendChild(card);
    });
}

// Function to add items to the cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantities = JSON.parse(localStorage.getItem("quantities")) || {};

    if (!cart.includes(id)) cart.push(id);
    quantities[id] = quantities[id] ? quantities[id] + 1 : 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantities", JSON.stringify(quantities));

    alert("Product added to cart!");
}

// Event listener for search input
searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = products.filter(
        (p) =>
            p.title.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
    );
    renderProducts(filtered);
});

// Event listener for sort select 
sortSelect.addEventListener("change", () => {
    let sorted = [...products]; // Make a copy of the products array
    const value = sortSelect.value;

    // Sort the products based on selected criteria 
    if (value === "priceLow") {
        sorted.sort((a,b) => a.price - b.price); // Sort by price: Low to High
    } else if (value === "priceHigh") {
        sorted.sort((a,b) => b.price - a.price); // Sort by price: High to Low
    } else if (value === "bestselling") {
        sorted.sort((a,b) => b.solid - a.solid); // Sort by best selling
    } else if (value === "category") {
        sorted.sort((a,b) => a.category.localeCompare(b.category)); // Sort by category
    }

    // Re-render the product with sorted list
    renderProducts(sorted);
});