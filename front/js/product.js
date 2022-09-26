// Recovering ID settings selected products inside nav adress //

let str = new URL(window.location.href);
let productId = str.searchParams.get("id");

// API request to recover all products and features
const PRODUCTS_URL = "http://localhost:3000/api/products/";

async function getArticle(productId) {
  const catchArticles = await fetch(PRODUCTS_URL + productId)
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      article = data;
    })
    .catch(function (err) {
      console.log("Erreur fetch" + err);
    });
  return article;
}

async function displayArticle(productId) {
  const article = await getArticle(productId);

  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  const productTitle = document.getElementById("title");
  productTitle.innerHTML = article.name;

  const productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  const productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // Loop for availibility colors of the product // 

  for (color of article.colors) {
    const productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = color;
    productColors.innerHTML = color;
  }

  addToCart();
}
displayArticle(productId);

function addToCart() {
  //products setting choice //

  const addBtn = document.getElementById("addToCart");
  const quantity = document.getElementById("quantity");
  const color = document.getElementById("colors");

  // If parameters are selected the event continue //

  addBtn.addEventListener("click", () => {
    if (color.value !== "" && quantity.value != 0 && quantity.value <= 100) {

      let userProductId = productId;
      let userProductColor = color.value;
      let userProductQty = quantity.value;

      // Object product creation //
      let userProductArray = {
        userProductId: userProductId,
        userProductColor: userProductColor,
        userProductQty: userProductQty,
      };

      // Provision of local storage if existing // 

      let productLocalStorage = JSON.parse(
        localStorage.getItem("userProducts")
      );

      // IF don't have local storage (NULL No value or type define) //

      if (productLocalStorage == null) {
        productLocalStorage = [];
        productLocalStorage.push(userProductArray);
        localStorage.setItem(
          "userProducts",
          JSON.stringify(productLocalStorage)
        );
        alert("Les articles ont bien étés ajoutés au panier");
      } else {

        // Condition IF contain same color same ID . "find" method in localStorage, comparison between values of objetcs -> userProductArray

        let mappingProducts = productLocalStorage.find(
          (el) =>
            el.userProductId === userProductId &&
            el.userProductColor === userProductColor
        );

        // If true, we add quantity of local storage objetc who meets the condition with the one of the page and returns whole to localstorage

        if (mappingProducts) {

          newQty =
            parseInt(mappingProducts.userProductQty) + parseInt(userProductQty);
          mappingProducts.userProductQty = newQty;

          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("Les articles ont bien étés ajoutés au panier ");
        } else {
          productLocalStorage.push(userProductArray);
          localStorage.setItem(
            "userProducts",
            JSON.stringify(productLocalStorage)
          );
          alert("Les articles ont bien étés ajoutés au panier");
        }
      }

    } else {
      alert(
        "Veuillez rectifier la quantité ou indiquer une couleur"
      );
    }
  });
}