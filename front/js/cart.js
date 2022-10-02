// Provision of elements for display loop //

const LOCALSTORAGE = JSON.parse(localStorage.getItem("userProducts"));
const PRODUCTS_URL = "http://localhost:3000/api/products/";

const displayCard = document.getElementById("cart__items");
const displayQty = document.getElementsByClassName("itemQuantity");

// VARIABLE INIT  - function displayTotal //

let sumPrice = [];
let totalQuantity = [];
let firstName, lastName, address, city, email;
let article;

// API CALL for article availibility //

async function getArticle(productID) {
  const catchArticles = await fetch(PRODUCTS_URL + productID)
    .then((catchArticles) => catchArticles.json())
    .then(function (data) {
      article = data;
    })
    .catch(function (err) {
      console.log("Erreur fetch" + err);
    });
  return article;
}

// Displaying article in the cart //

async function displayBasket() {

  if (LOCALSTORAGE !== null) {
    for (let product of LOCALSTORAGE) {

      const article = await getArticle(product.userProductId);

      let userProductChoiceId = article._id;
      let userProductChoiceColor = product.userProductColor;
      let userProductChoiceImg = article.imageUrl;
      let userProductChoiceImgAlt = article.altTxt;
      let userProductChoiceName = article.name;
      let userProductChoicePrice = article.price;
      let userProductChoiceQuantity = product.userProductQty;

      // HTML ELEMENTS FOR DISPLAYING //

      // Article //

      const productCard = document.createElement("article");
      displayCard.appendChild(productCard);
      productCard.classList = "cart__item";
      productCard.dataset.id = userProductChoiceId;
      productCard.dataset.color = userProductChoiceColor;

      // IMAGES //

      const productCardImgContainer = document.createElement("div");
      productCard.appendChild(productCardImgContainer);
      productCardImgContainer.classList = "cart__item__img";

      const productCardImg = document.createElement("img");
      productCardImgContainer.appendChild(productCardImg);
      productCardImg.src = userProductChoiceImg;
      productCardImg.alt = userProductChoiceImgAlt;

      // div Content & content desc //

      const productCardContent = document.createElement("div");
      productCard.appendChild(productCardContent);
      productCardContent.classList = "cart__item__content";

      const productCardContentDescription = document.createElement("div");
      productCardContent.appendChild(productCardContentDescription);
      productCardContentDescription.classList =
        "cart__item__content__description";

      // Titre h2 - products name //

      const productCardContentName = document.createElement("h2");
      productCardContentDescription.appendChild(productCardContentName);
      productCardContentName.innerHTML = userProductChoiceName;

      // Paragraphe - Products Colors //

      const productCardContentColor = document.createElement("p");
      productCardContentDescription.appendChild(productCardContentColor);
      productCardContentColor.innerHTML = userProductChoiceColor;

      // Paragraphe _ Prix du produit //

      const productCardContentPrice = document.createElement("p");
      productCardContentDescription.appendChild(productCardContentPrice);
      productCardContentPrice.classList =
        "cart__item__content__description__price";
      productCardContentPrice.dataset.price = userProductChoicePrice;
      productCardContentPrice.innerHTML = userProductChoicePrice + " €";

      // div Content Settings //

      const productCardSettings = document.createElement("div");
      productCard.appendChild(productCardSettings);
      productCardSettings.classList = "cart__item__content__settings";

      // div Content Quantity //

      const productCardSettingsQuantity = document.createElement("div");
      productCardSettings.appendChild(productCardSettingsQuantity);
      productCardSettingsQuantity.classList =
        "cart__item__content__settings__quantity";

      // Paragraphe "Qté :"" //

      const productCardSettingsQuantityTitle = document.createElement("p");
        productCardSettingsQuantity.appendChild(productCardSettingsQuantityTitle);
        productCardSettingsQuantityTitle.textContent = "Qté : ";

      // Input Quantity //

      const productCardSettingsQuantityInput = document.createElement("input");
        productCardSettingsQuantity.appendChild(productCardSettingsQuantityInput);
        productCardSettingsQuantityInput.setAttribute("type", "number");
        productCardSettingsQuantityInput.classList = "itemQuantity";
        productCardSettingsQuantityInput.setAttribute("name", "itemQuantity");
        productCardSettingsQuantityInput.setAttribute("min", "1");
        productCardSettingsQuantityInput.setAttribute("max", "100");
        productCardSettingsQuantityInput.setAttribute(
            "value",
        userProductChoiceQuantity
      );

      // div Delete //

      const productCardDeleteContainer = document.createElement("div");
      productCardSettings.appendChild(productCardDeleteContainer);
      productCardDeleteContainer.classList =
        "cart__item__content__settings__delete";

      // p delete button

      const productCardDeleteButton = document.createElement("p");
      productCardDeleteContainer.appendChild(productCardDeleteButton);
      productCardDeleteButton.classList = "deleteItem";
      productCardDeleteButton.textContent = "Supprimer";


      evalTotal(userProductChoiceQuantity, userProductChoicePrice);
    }
  } else {
   
    const productCardEmpty = document.createElement("p");
    displayCard.appendChild(productCardEmpty);
    productCardEmpty.textContent = "Votre panier est vide";

    const totalPriceSpan = document.getElementById("totalPrice");
    totalPriceSpan.textContent = 0;

    const totalQuantitySpan = document.getElementById("totalQuantity");
    totalQuantitySpan.textContent = 0;
  }
  changeTotal();
  removeItems();
}
displayBasket();

// Storage of each item price depend to quantity and quantity storage //

function evalTotal(Qty, Price) {
  let totalPrice = Qty * Price;
  sumPrice.push(totalPrice);

  totalQuantity.push(Number(Qty));

  displayTotal(sumPrice, totalQuantity);
}

function displayTotal(sumPrice, totalQuantity) {
  sumPrice = sumPrice.reduce((a, b) => a + b);
  totalQuantity = totalQuantity.reduce((a, b) => a + b);

  const totalPriceSpan = document.getElementById("totalPrice");
  totalPriceSpan.dataset.price = sumPrice;
  totalPriceSpan.textContent = sumPrice;

  const totalQuantitySpan = document.getElementById("totalQuantity");
  totalQuantitySpan.dataset.qty = totalQuantity;
  totalQuantitySpan.textContent = totalQuantity;
}

// Total articles changes //

function changeTotal() {
  
  const inputQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < inputQuantity.length; i++) {
    let self = inputQuantity[i];
    const target = self.closest("article");
    const targetPrice = document.querySelectorAll(
      "#cart__items > article > div.cart__item__content > div > p.cart__item__content__description__price"
    );

    // Input Listening //
    self.addEventListener("change", async function () {
      let changingProductid = target.dataset.id;
      let changingProductColor = target.dataset.color;
      let newQty = self.value;

      for (product of LOCALSTORAGE) {
        const article = await getArticle(product.userProductId);
        if (
          changingProductid === product.userProductId &&
          changingProductColor === product.userProductColor
        ) {
          product.userProductQty = newQty;
          if (newQty != 0) {
            localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));

            let sumArray = [];
            let sumProduct = 0;

            let qtyArray = [];

            for (product of LOCALSTORAGE) {
              sumProduct = article.price * product.userProductQty;
              sumArray.push(sumProduct);
              qtyArray.push(Number(product.userProductQty));
            }

            sumArray = sumArray.reduce((a, b) => a + b);
            qtyArray = qtyArray.reduce((a, b) => a + b);

            const totalPriceSpan = document.getElementById("totalPrice");
            totalPriceSpan.dataset.price = sumArray;
            totalPriceSpan.textContent = sumArray;

            const totalQuantitySpan = document.getElementById("totalQuantity");
            totalQuantitySpan.dataset.qty = qtyArray;
            totalQuantitySpan.textContent = qtyArray;
          } else if (newQty == 0) {
            LOCALSTORAGE.splice(LOCALSTORAGE.indexOf(product), 1)
            localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE))
            location.reload();
          } else {
            alert("Votre panier est vide")
          }
        }
      }
    });
  }
};

// Removing Items //

function removeItems() {
  const deleteProduct = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteProduct.length; i++) {
    let self = deleteProduct[i];
    let target = self.closest("article");

    deleteProduct[i].addEventListener("click", () => {
      let deleteProductid = target.dataset.id;
      let deleteProductColor = target.dataset.color;

      for (product of LOCALSTORAGE) {
        if (
          deleteProductid === product.userProductId &&
          deleteProductColor === product.userProductColor
        ) {
          LOCALSTORAGE.splice(i, 1);
          localStorage.setItem("userProducts", JSON.stringify(LOCALSTORAGE));
          if (LOCALSTORAGE.length === 0) {
            localStorage.removeItem("userProducts");
            window.location.reload();
          } else {
            window.location.reload();
          }
        }
      }
    });
  }
}

// Form //

function getUserForm() {
  let inputs = document.querySelectorAll("input");

  // Error management //

  const errorDisplay = (tag, message, valid) => {
    const displayErrorMessage = document.querySelector("#" + tag + "ErrorMsg");
    if (!valid) {
      displayErrorMessage.textContent = message;
    } else {
      displayErrorMessage.textContent = "";
    }
  };

  // Validation via REGEX //

  const firstNameChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "firstName",
        "Le prénom doit contenir au moins 2 caractères"
      );
      firstName = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "firstName",
        "Le prénom ne peux pas contenir de caractères spéciaux"
      );
      firstName = null;
    } else {
      errorDisplay("firstName", "", true);
      firstName = value;
    }
  };

  const lastNameChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "lastName",
        "Le nom de famille doit contenir au minimum 2 caractères"
      );
      lastName = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "lastName",
        "Le nom de famille ne doit pas contenir de caractères spéciaux"
      );
      lastName = null;
    } else {
      errorDisplay("lastName", "", true);
      lastName = value;
    }
  };

  const addressChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 50)) {
      errorDisplay(
        "address",
        "L'adresse doit contenir entre 2 et 20 caractères"
      );
      address = null;
    } else if (
      !value.match(
        /^([1-9][0-9]*(?:-[1-9][0-9]*)*)[\s,-]+(?:(bis|ter|qua)[\s,-]+)?([\w]+[\-\w]*)[\s,]+([-\w].+)$/
      )
    ) {
      errorDisplay(
        "address",
        "L'adresse doit comprendre un numéro, la voie, le nom de la voie ainsi que le code postal et la ville"
      );
      address = null;
    } else {
      errorDisplay("address", "", true);
      address = value;
    }
  };

  const cityChecker = (value) => {
    if (value.length > 0 && (value.length < 2 || value.length > 20)) {
      errorDisplay(
        "city",
        "Le nom de la ville doit contenir entre 2 et 20 caractères"
      );
      city = null;
    } else if (!value.match(/^[a-zA-z0-9_.-]*$/)) {
      errorDisplay(
        "city",
        "Le nom de la ville ne doit pas contenir de caractères spéciaux"
      );
      city = null;
    } else {
      errorDisplay("city", "", true);
      city = value;
    }
  };

  const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
      errorDisplay("email", "Le mail n'est pas valide");
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };

  // Listening FORM //

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "firstName":
          firstNameChecker(e.target.value);

          break;
        case "lastName":
          lastNameChecker(e.target.value);

          break;
        case "address":
          addressChecker(e.target.value);

          break;
        case "city":
          cityChecker(e.target.value);

          break;
        case "email":
          emailChecker(e.target.value);
        default:
          null;
      }
    });
  });
}
getUserForm();

// Send POST request to API //

function postForm() {
  const orderBtn = document.getElementById("order");

  // Summit button listening

  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (LOCALSTORAGE !== null) {
      let orderProducts = [];
      for (let i = 0; i < LOCALSTORAGE.length; i++) {
        orderProducts.push(LOCALSTORAGE[i].userProductId);
      }

      // Object construction

      if (firstName && lastName && address && city && email) {
        const orderUserProduct = {
          contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
          },
          products: orderProducts,
        };

        const options = {
          method: "POST",
          body: JSON.stringify(orderUserProduct),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        fetch("http://localhost:3000/api/products/order", options)
          .then((res) => res.json())
          .then((data) => {
            // Renvoi de l'orderID dans l'URL
            document.location.href = "confirmation.html?id=" + data.orderId;
          })
          .catch(function (err) {
            console.log("Erreur fetch" + err);
          });
      } else {
        alert("Veuillez renseigner le formulaire");
      }
    } else {
      alert("Votre Panier est vide");
    }
  });
}
postForm();