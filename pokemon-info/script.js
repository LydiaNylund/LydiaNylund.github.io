const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("button");
let doYou;
const info = document.getElementById("infoContainer");
const still = document.getElementById("still");

let name = document.getElementById("name");
let pokeHeight = document.getElementById("height");
let pokeWeight = document.getElementById("weight");
let pokeType = document.getElementById("type");
let frontPic = document.getElementById("frontPic");
let backPic = document.getElementById("backPic");

searchButton.addEventListener("click", onSearchButtonClicked);

function onSearchButtonClicked() {
    if(pokemonInput.value == "BRVR") {
        player();
    }
    else {
        let pokeName = pokemonInput.value;


        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(response => response.json())
        .then(data => getInfo(data))
    }

}

function getInfo(data) {
    if(doYou) {
        info.classList.remove("over");
        still.removeChild(doYou);
    }

    name.innerHTML = `Name: ${data.name}`
    pokeHeight.innerHTML = `Height: ${data.height}`;
    pokeWeight.innerHTML = `Weight: ${data.weight}`;
    pokeType.innerHTML = `Type: ${data.types[0].type.name}`;
    frontPic.innerHTML = `<img src="${data.sprites.front_default}"></img>`;
    backPic.innerHTML = `<img src="${data.sprites.back_default}"></img>`;

}
function player() {

    info.classList.add("over");
    console.log(info)

    name.innerHTML = "Pikachu";
    pokeHeight.innerHTML = `Height: 4`;
    pokeWeight.innerHTML = `Weight: 60`;
    pokeType.innerHTML = `Type: electric`;
    frontPic.innerHTML = `<img src="25-1.png"></img>`;
    backPic.innerHTML = `<img src="25.png"></img>`;

    doYou = document.createElement("div");
    doYou.textContent = "Do you still love me?";
    doYou.classList.add("big");
    still.appendChild(doYou);
}