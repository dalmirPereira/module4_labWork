
// Create a new script element for adding Bootstrap JS
var script = document.createElement('script');

// Set the src attribute to the Bootstrap JS
script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
script.integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
script.crossOrigin = "anonymous";

// Append the script element to the body (or head)
document.body.appendChild(script);

// Data to be printed on the cards.
const cards = [];

function saveNewCar(){
    const title = document.getElementById("new-car").value;
    const desc = document.getElementById("new-description").value;
    
    if (!title || !desc) {
        alert("Please fill New Car Name and New Description")
    } else {
        const card = {
            title,
            desc,
            img: "https://picsum.photos/200/300"
        }

        cards.push(card);
        document.getElementById("new-car").value = '';
        document.getElementById("new-description").value = '';
    }
}

function debounce(func) {
    let timer;

    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(func, 500);
    };
  }
  
let debounceFunc = debounce(saveNewCar);
document.getElementById("saveCar").addEventListener("click", debounceFunc);

function addCard(card) {
    const template = document.getElementById("card-template").content.cloneNode(true); 
    template.querySelector('.card-title').innerText = card.title;
    template.querySelector('.card-text').innerText = card.description;
    template.querySelector('.card-img-top').src = card.img;
    document.querySelector('#car-list').appendChild(template);
}

function interval(cards){
    //first template
    cards.forEach((card) => {
        addCard(card);
    })
    
    //template update every 5seconds
    const templateInterval = setInterval(() => {
        document.querySelector('#car-list').innerHTML = '';
        cards.forEach((card) => {
            //card.title += ' *';
            addCard(card);
        })
    }, 5000)
    return templateInterval;
}

//Call addCard() for each element to be printed
if ('content' in document.createElement('template')) {
    interval(cards);
}
