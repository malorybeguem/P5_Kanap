const urlOrderId = new URLSearchParams(window.location.search).get("orderId");
if(urlOrderId === null || urlOrderId === ""){
    alert ("Une erreur s'est produite lors de la validation de votre commande. Veuillez nous en excuser !");
    window.location.href = "index.html";
 }
 else{
    // Sélection de l'élément html dans lequel on veut afficher le numéro de commande
    const idCommande = document.getElementById("orderId");
    // On insère le numéro de commande dans le html
    idCommande.innerText = urlOrderId;
    console.log(idCommande);
}