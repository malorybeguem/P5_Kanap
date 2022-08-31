//Show products on the main page//

fillSection();
async function getArticles() {
    var retrieveItems = await fetch("http://localhost:3000/api/products")
    return await retrieveItems.json();
}
