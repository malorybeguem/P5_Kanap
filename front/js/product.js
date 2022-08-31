//Recover ID from URL //
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);