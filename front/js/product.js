var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";
const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Recovering articles from API //
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Data repartition //
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
                                    // For display the articles //  
function getPost(article){  
    // H1 Modification //
        let productName = document.getElementById('title');
            productName.innerHTML = article.name;
    // Price //
        let productPrice = document.getElementById('price');
            productPrice.innerHTML = article.price;
    // Picture Insertion //
        let productImg = document.createElement("img");
            document.querySelector(".item__img").appendChild(productImg);
            productImg.src = article.imageUrl;
            productImg.alt = article.altTxt;
    // Description //
        let productDescription = document.getElementById('description');
            productDescription.innerHTML = article.description;
    // Colors //
        for (let colors of article.colors){
            console.table(colors);
            let productColors = document.createElement("option");
                document.querySelector("#colors").appendChild(productColors);
                productColors.value = colors;
                productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Cart management//
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Listening the cart with conditions
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){
    
            //Recovering colors //
    let choixCouleur = colorPicked.value;
            //Recovering quantite //
    let choixQuantite = quantityPicked.value;
            //Recovering of options to the cart
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    // Localstorage Init
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    // pop-up //
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
pour le consulter, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //If the product are also in the cart
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //If he don't yet in the cart
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
            }
        //If empty
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}