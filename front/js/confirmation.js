//Recovering Order Number //

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// Displaying number //
const userOrderId = document.querySelector('#orderId');
userOrderId.textContent = productId;

// Data reset of Local Storage //
localStorage.removeItem('userProducts');