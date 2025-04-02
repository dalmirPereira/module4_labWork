
// Create a new script element for adding Bootstrap JS
var script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
script.integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
script.crossOrigin = "anonymous";
document.body.appendChild(script);

// Create a new script element for adding Axios library
var scriptAxios = document.createElement('script');
scriptAxios.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
document.body.appendChild(scriptAxios);

//-------------------------------------------------------------------------------------

//fetch data from api
async function getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiData = await response.json();

    //return the product list 
    return apiData;
}

async function populateCategories() {
    // Wait for the products to be fetched
    const products = await getProducts(); 
    
    // Use a Set to store unique categories
    const categoriesSet = new Set();
    products.forEach(product => {
        categoriesSet.add(product.category); 
    });
    
    // Get the dropdown element
    const categoriesSelect = document.getElementById("categories");
    
    // Iterate over the categories and create option elements
    categoriesSet.forEach(category => {
        const newCategory = document.createElement('option');
        newCategory.value = category;
        newCategory.textContent = category;
        categoriesSelect.appendChild(newCategory);
    });

    return products;
}

let products = [];

populateCategories().then(data => {
    products = data;
})

//-------------------------------------------------------------------------------------

//debounce function to avoid double click
function debounce(func) {
    let timer;

    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(func, 500);
    };
  }

//button submittion with debounce
let debounceFunc = debounce(submitRequest);
document.getElementById("card-submit").addEventListener("click", debounceFunc);

//This function will be called by the button and will get the elements from the form and 
//call the functions to print cards depending on the type of request and number of cards.
function submitRequest(){
    const category = document.getElementById("categories").value;

    document.getElementById("card-list").innerHTML = ''

    for(let product of products){
        if (product.category === category) addCard(product);
    }
    
}

//render the template
function addCard(card) {

    const template = document.getElementById("card-template").content.cloneNode(true); 
    template.querySelector('.card-title').innerText = card.title;
    template.querySelector('.card-text').innerText = card.description;
    template.querySelector('.card-price').innerText = `$${card.price}`;
    document.querySelector('#card-list').appendChild(template);
}

