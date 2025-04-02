
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
    const numberCards = document.getElementById("number-cards").value;
    const httpRequest = document.querySelector('input[name="http-request"]:checked').value;
    console.log(numberCards);
    console.log(httpRequest);

    (httpRequest === "fetch") ? fetchRequest(numberCards) : axiosRequest(numberCards);
}

//uses fetch() for getting the data from the API
async function fetchRequest(numberCards) {
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${numberCards}`);
        const apiData = await response.json()
        console.log(apiData);

        //clean up form
        document.getElementById("card-list").innerHTML = ''

        return apiData.forEach((card) => addCard(card));

    } catch (error){
        console.error("Error", error);

        return null;
    }
}

//uses axios for getting the data from the API
async function axiosRequest(numberCards) {
    try{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${numberCards}`);
        const apiData = await response.data
        console.log(apiData);

        //clean up form
        document.getElementById("card-list").innerHTML = ''

        return apiData.forEach((card) => addCard(card));

    } catch (error){
        console.error("Error", error);

        return null;
    }
}

//render the template
function addCard(card) {
    const template = document.getElementById("card-template").content.cloneNode(true); 
    template.querySelector('.card-title').innerText = card.title;
    template.querySelector('.card-text').innerText = card.body;
    document.querySelector('#card-list').appendChild(template);
}
