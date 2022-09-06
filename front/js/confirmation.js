//Recovering Order Number

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Displaying the number
const userOrderId = document.querySelector('#orderId');
userOrderId.textContent = productId;

// Reset datas on localStorage
localStorage.removeItem('userProducts');