"use strict";

var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var category = document.getElementById("category");
var create = document.getElementById("create");
var mood = "create";
var tmp; //get Total

function getTotal() {
  if (price.value != "") {
    var result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#4caf50";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
} //Create Product


var dataProduct;

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

create.onclick = function () {
  var newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value
  };

  if (mood === "create") {
    if (newProduct.count > 1) {
      for (var i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[tmp] = newProduct;
    mood = "create";
    create.innerHTML = "Create";
    count.style.display = "block";
  } //save to localStorge


  localStorage.setItem("product", JSON.stringify(dataProduct)); //trigger clearData function

  clearData();
  showProduct();
}; //Clear Data


function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
} //read product


function showProduct() {
  getTotal();
  var table = "";

  for (var i = 0; i < dataProduct.length; i++) {
    table += "\n        <tr>\n            <td>".concat(i, "</td>\n            <td>").concat(dataProduct[i].title, "</td>\n            <td>").concat(dataProduct[i].price, "</td>\n            <td>").concat(dataProduct[i].taxes, "</td>\n            <td>").concat(dataProduct[i].ads, "</td>\n            <td>").concat(dataProduct[i].discount, "</td>\n            <td>").concat(dataProduct[i].total, "</td>\n            <td>").concat(dataProduct[i].category, "</td>\n            <td><button onclick=\"updateData(").concat(i, ")\" id=\"update\">update</button></td>\n            <td><button onclick=\"deleteData(").concat(i, ")\" id=\"delete\">delete</button></td>\n        </tr>\n        ");
  }

  document.getElementById("tbody").innerHTML = table;
  var deleteAllBtn = document.getElementById("deleteAll");

  if (dataProduct.length > 0) {
    deleteAllBtn.innerHTML = "<button onclick=\"deleteAll()\" id=\"delete\">Delete All(".concat(dataProduct.length, ")</button>");
  } else {
    deleteAllBtn.innerHTML = "";
  }
}

showProduct(); //Delete 

function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showProduct();
}

function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showProduct();
} //update


function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[i].category;
  create.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth"
  });
} //Search 
// let searchMood = "title";
// function getSearchMood(id){
//     let search = document.getElementById("search")
//     if(id == "searchTitle"){
//         searchMood = "title"
//         search.Placeholder = "Search By Title"
//     }else{
//         searchMood = "category";
//         search.Placeholder = "Search By Category"
//     }
//     search.focus()
// }


var searchmood = 'title';

function getsearchmood(id) {
  var search = document.getElementById('search');

  if (id == 'searchTitle') {
    searchmood = 'title';
    search.placeholder = 'Search By ' + searchmood;
  } else {
    searchmood = 'category';
  }

  search.placeholder = 'Search By ' + searchmood;
  search.focus();
  search.value = '';
  showProduct();
}

function searchData(value) {
  var table = '';

  for (var i = 0; i < dataProduct.length; i++) {
    if (searchmood == 'title') {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += "\n                <tr>\n                <td>".concat(i + 1, "</td>\n                <td>").concat(dataProduct[i].title, "</td>\n                <td>").concat(dataProduct[i].price, "</td>\n                <td>").concat(dataProduct[i].taxes, "</td>\n                <td>").concat(dataProduct[i].ads, "</td>\n                <td>").concat(dataProduct[i].discount, "</td>\n                <td>").concat(dataProduct[i].count, "</td>\n                <td>").concat(dataProduct[i].total, "</td>\n                <td>").concat(dataProduct[i].category, "</td>\n                <td><button onclick=\"updateData( ").concat(i, " )\" id=\"update\">Update</button></td>\n                <td><button onclick=\"deleteData( ").concat(i, " )\" id=\"delete\">Delete</button></td>\n                </tr>");
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += "\n            <tr>\n                <td>".concat(i + 1, "</td>\n                <td>").concat(dataProduct[i].title, "</td>\n                <td>").concat(dataProduct[i].price, "</td>\n                <td>").concat(dataProduct[i].taxes, "</td>\n                <td>").concat(dataProduct[i].ads, "</td>\n                <td>").concat(dataProduct[i].discount, "</td>\n                <td>").concat(dataProduct[i].count, "</td>\n                <td>").concat(dataProduct[i].total, "</td>\n                <td>").concat(dataProduct[i].category, "</td>\n                <td><button onclick=\"updateData(").concat(i, ")\" id=\"update\">Update</button></td>\n                <td><button onclick=\"deleteData(").concat(i, ")\" id=\"delete\">Delete</button></td>\n            </tr>\n        ");
      }
    }
  }

  document.getElementById('tbody').innerHTML = table;
}