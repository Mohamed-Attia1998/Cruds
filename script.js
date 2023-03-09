let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")


let mood = "create"
let tmp;


//get Total
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#4caf50";
    }else{
        total.innerHTML = ""
        total.style.background = "#a00d02"
    }
}

//Create Product
let dataProduct;
if(localStorage.product != null){
        dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}
create.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };

    if(mood === "create"){
        if(newProduct.count > 1){
            for(let i  = 0 ; i < newProduct.count ; i++){
                dataProduct.push(newProduct)
            }
        }else{
            dataProduct.push(newProduct)
        }
    }else{
        dataProduct[tmp] = newProduct;
        mood = "create"
        create.innerHTML = "Create";
        count.style.display = "block"
    }
    
    //save to localStorge
    localStorage.setItem("product", JSON.stringify(dataProduct))
    //trigger clearData function
    clearData()
    showProduct()
}
//Clear Data
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
//read product
function showProduct(){
    getTotal()
    let table = "";
    for(let i = 0 ; i< dataProduct.length ; i++){
        table += 
        `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `    
    } 
    document.getElementById("tbody").innerHTML = table;
    
    let deleteAllBtn = document.getElementById("deleteAll")
    if(dataProduct.length>0){
        deleteAllBtn.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All(${dataProduct.length})</button>`
    }else{
        deleteAllBtn.innerHTML = ""
    }
}
showProduct()

//Delete 
function deleteData(i){
    dataProduct.splice(i,1)
    localStorage.product = JSON.stringify(dataProduct)
    showProduct()
}

function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0)
    showProduct()
}

//update
function updateData(i){
    title.value = dataProduct[i].title
    price.value = dataProduct[i].price
    taxes.value = dataProduct[i].taxes
    ads.value = dataProduct[i].ads
    discount.value = dataProduct[i].discount
    getTotal()
    count.style.display="none"
    category.value = dataProduct[i].category
    create.innerHTML = "Update"
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//Search 
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
let searchmood = 'title';
function getsearchmood(id)
{
    

    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchmood = 'title';
        search.placeholder = 'Search By '+ searchmood;
    }
        else{
                searchmood = 'category';
                
            }
            search.placeholder = 'Search By '+ searchmood;
        search.focus(); 
        search.value   = '';
        showProduct();
    
}

function searchData(value)
{
    let table = '';
    for(let i =0; i < dataProduct.length;i++){
    if(searchmood == 'title')
    {
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
                </tr>`;
            }
        



    }else{

        
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += 
        `
            <tr>
                <td>${i+1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
        `
            }
    

    }
}

    document.getElementById('tbody').innerHTML = table;

}