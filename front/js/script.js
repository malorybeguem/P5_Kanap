
//Recover products from the API//
const recoverProducts = async function () {
    await fetch("http://localhost:3000/api/products")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            return (products = data);
        });
};
// Select element and display products //
const productElement = document.querySelector("#items");

//Display products on the main page //
async function displayProducts() {
    await recoverProducts();
    products.forEach((product) => {
        productElement.innerHTML += `
            <a href="./product.html?id=${product._id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.altTxt}" />
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>  
            </article>
            </a>`;
    });
}
displayProducts();
