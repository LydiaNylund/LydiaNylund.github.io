let numberOfNumbers = 6;
let numberArray = [];

let timesClickedSpin = 0;
let sameNumber = 0;

const numbersOutput = document.getElementById("numbers");
const locksOutput = document.getElementById("locks");
const spinButton = document.getElementById("spin");
const winOutput = document.getElementById("winOutput");
const resetButton = document.getElementById("reset");

spinButton.addEventListener("click", spinButtonClicked);
resetButton.addEventListener("click", resetButtonClicked);


for(let i = 0; i < numberOfNumbers; i++) {    
    numberArray.push({
        num: 0,
        locked: false,
        button: document.createElement("button"),
        display: document.createElement("div")
    });
    numberArray[i].button.textContent = "Lock";
    numberArray[i].button.addEventListener("click", lockButtonClicked);
    locksOutput.appendChild(numberArray[i].button);

    numberArray[i].display.innerHTML = numberArray[i].num;
    numbersOutput.appendChild(numberArray[i].display);
}


function spinButtonClicked() {
    timesClickedSpin++;
    sameNumber = 0;

    for(let i = 0; i < numberOfNumbers; i++) {
        if(!numberArray[i].locked) {
            numberArray[i].num = (Math.floor(Math.random() * 10));
            numberArray[i].display.innerHTML = numberArray[i].num;
        }
        if(numberArray[0].num === numberArray[i].num) {
            sameNumber++;
        }
    }
    winOutput.innerHTML = "";
    checkWin();
}

function checkWin() {
    if(sameNumber === numberOfNumbers) {
        winOutput.innerHTML = `Du har vunnit! ${"<br>"} Du klickade spin ${timesClickedSpin} gånger.`;
    }
}

function lockButtonClicked(event) {   
    for(let i = 0; i < numberOfNumbers; i++) {
        if(event.target === numberArray[i].button) {
            numberArray[i].locked = !numberArray[i].locked;
            if(numberArray[i].display.style.color === "grey") {
                numberArray[i].display.style.color = "black";
            }
            else {
                numberArray[i].display.style.color = "grey";
            }
        }
    }
}

function resetButtonClicked() {
    timesClickedSpin = 0;
    winOutput.innerHTML = "";
    for(let i = 0; i < numberOfNumbers; i++) {
        numberArray[i].num = 0;
        numberArray[i].display.innerHTML = numberArray[i].num;
    }
}