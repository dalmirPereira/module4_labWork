
// Create a new script element for adding Bootstrap JS
var script = document.createElement('script');

// Set the src attribute to the Bootstrap JS
script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
script.integrity = "sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM";
script.crossOrigin = "anonymous";

// Append the script element to the body (or head)
document.body.appendChild(script);

// Data to be printed on the cards.
const cards = [
    { title: 'Test 1', description: 'This is Test 1 text.' },
    { title: 'Test 2', description: 'This is Test 2 text.' },
    { title: 'Test 3', description: 'This is Test 3 text.' },
];

function addCard(card) {
    const template = document.getElementById("card-template").content.cloneNode(true); 
    template.querySelector('.card-title').innerText = card.title;
    template.querySelector('.card-text').innerText = card.description;
    document.querySelector('#car-list').appendChild(template);
}

//Call addCard() for each element to be printed
if ('content' in document.createElement('template')) {
    cards.forEach((card) => {
        addCard(card);
    })
}