const number1Output = document.getElementById("number1");
const number2Output = document.getElementById("number2");
const number3Output = document.getElementById("number3");

const lockButton1 = document.getElementById("lock1");
const lockButton2 = document.getElementById("lock2");
const lockButton3 = document.getElementById("lock3");

const spinButton = document.getElementById("spin");

let is1Locked;
let is2Locked;
let is3Locked;


spinButton.addEventListener("click", spinButtonClicked);
lockButton1.addEventListener("click", lockButtonClicked);
lockButton2.addEventListener("click", lockButtonClicked);
lockButton3.addEventListener("click", lockButtonClicked);



spinButtonClicked();



function spinButtonClicked() {
    if(!is1Locked === true) {
        number = Math.floor(Math.random() * 10);
        number1Output.innerHTML = number;
    }
    if(!is2Locked === true) {
        number = Math.floor(Math.random() * 10);
        number2Output.innerHTML = number;
    }

    if(!is3Locked === true) {
        number = Math.floor(Math.random() * 10);
        number3Output.innerHTML = number;
    }
     
}

function lockButtonClicked(event) {
    let lockSelected = event.target;
    
    if(lockSelected === lockButton1) {
        if(is1Locked === true) {
            number1Output.style.color = "black";
            is1Locked = false;
        }
        else {
            number1Output.style.color = "grey";
            is1Locked = true;
        }

    }
    if(lockSelected === lockButton2) {
        if(is2Locked === true) {
            number2Output.style.color = "black";
            is2Locked = false;
        }
        else {
            number2Output.style.color = "grey";
            is2Locked = true;
        }
    }
    if(lockSelected === lockButton3) {
        if(is3Locked === true) {
            number3Output.style.color = "black";
            is3Locked = false;
        }
        else {
            number3Output.style.color = "grey";
            is3Locked = true;
        }
    }

}