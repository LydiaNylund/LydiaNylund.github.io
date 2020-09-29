const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("button");


let pokeHeight = document.getElementById("height");
let pokeWeight = document.getElementById("weight");
let pokeType = document.getElementById("type");
let frontPic = document.getElementById("frontPic");
let backPic = document.getElementById("backPic");

searchButton.addEventListener("click", onSearchButtonClicked);

function onSearchButtonClicked() {
    let pokeName = pokemonInput.value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    .then(response => response.json())
    .then(data => getInfo(data))
}

function getInfo(data) {
    console.log(data)

    pokeHeight.innerHTML = data.height;
    pokeWeight.innerHTML = data.weight;
    pokeType.innerHTML = data.types[0].type.name;
    frontPic = data.sprites.front_default;
    backPic = data.sprites.back_default;
}