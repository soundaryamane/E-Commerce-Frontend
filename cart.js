let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quantities =JSON.parse(localStorage.getItem("quantities")) || {};
const container = document.getElementById("cartContainer");
const totalE1=document.getElementById("totalPrice");

function renderCart() {
    container.innerHTML="";
    let total=0;

cart.forEach((id) => {
    const product = products.find((p)=> p.id === id);
    const quantity = quantities[id] || 1;
    const subtotal = product.price * quantity;
    total += subtotal;
    
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<img src="${product.image}">
        <h4>${product.title}</h4>
        <p>₹${product.price}  <input type="number" value="${quantity}" min="1">
        <onchange="updateQuantity(${id}, this.value)"></p>
        <p><strong>subtotal:</strong>₹${subtotal}</p>`;
        container.appendChild(card);
    
});

totalE1.textContent=`Total:₹${total}`;
}
function updateQuantity(id,value){
    quantities[id]=parseInt(value);
    localStorage.setItem("quantities",JSON.stringify(quantities));
    renderCart();
}
function placeOrder(){
    alert("order placed successfully!");
    localStorage.removeItem("cart");
    localStorage.removeItem("quantities");
    window.location.href="order.html";

}
renderCart();

