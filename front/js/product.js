//Recover ID from URL //
let urlParam = (new URL(location)).searchParams
let productId = urlParam.get("id")

// Recovering elements for all products//

const titleId = document.getElementById("title")
const colorId = document.getElementById("colors")
const imgId = document.querySelector(".item__img")
const descriptionId = document.getElementById("description")
const priceId = document.getElementById("price")

// Call to API for recover products

fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
        if (response.ok) {
            response.json()
                .then((product) => {
                    // On injecte les infos dans le HTML
                    titleId.innerHTML = `${product.name}`
                    descriptionId.innerHTML = `${product.description}`
                    priceId.innerHTML = `${product.price}`
                    imgId.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
                    const colorArray = product.colors
                    for (let color of colorArray) {
                        colorId.innerHTML += `<option value="${color}"> ${color}</option>`
                    }
                })
        }
    })
// Add of products and informations in localstorage//
// Selecton of datas sent to local storage//

const btnAdd = document.querySelector("#addToCart")
const color = document.querySelector("#colors")
const quantity = document.querySelector("#quantity")

// When clicking btnAdd, add object productOptions to localstorage with a function //

btnAdd.addEventListener('click', e => {
    if (color.value === "") {
        alert("Choisissez d'abord une couleur")
    } else if (quantity.value > 0 && quantity.value < 100) {
        const productOptions = {
            id: productId,
            color: color.value,
            quantity: quantity.value,
        }
        // Recover file from localStorage //
        addToCart(productOptions)

    } else if (quantity.value > 100) {
        alert("La quantité d'un article de même référence et de même couleur ne peut pas dépasser 100. Veuillez rectifier la quantité !")

    }
})