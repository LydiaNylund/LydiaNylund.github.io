const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("button");
let doYou;
const info = document.getElementById("infoContainer");
const still = document.getElementById("still");
let loader = document.getElementById("loader");
const form = document.getElementById("form");

let name = document.getElementById("name");
let pokeHeight = document.getElementById("height");
let pokeWeight = document.getElementById("weight");
let pokeType = document.getElementById("type");
let frontPic = document.getElementById("frontPic");
let backPic = document.getElementById("backPic");
let picBg = document.getElementsByClassName("picBg");

loader.classList.add("hide");

form.addEventListener("submit", onSearchButtonClicked);

function onSearchButtonClicked(e) {
    e.preventDefault();
    let i = 0;
    while(i<picBg.length) {
        picBg[i].classList.add("border");
        i++;
    }
    loader.classList.remove("hide");

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
    console.log(data)

    loader.classList.add("hide");
    if(doYou) {
        info.classList.remove("over");
        still.removeChild(doYou);
    }
    

    name.innerHTML = `Name: ${data.name}`
    pokeHeight.innerHTML = `Height: ${data.height}`;
    pokeWeight.innerHTML = `Weight: ${data.weight}`;

    pokeType.innerHTML = `Type: `;
    let i = 0;
    while(i<data.types.length) {
        pokeType.innerHTML += `${data.types[i].type.name} `;
        i++;
    }
   
    frontPic.innerHTML = `<img src="${data.sprites.front_default}"></img>`;
    backPic.innerHTML = `<img src="${data.sprites.back_default}"></img>`;

}


function player() {

    loader.classList.add("hide");
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