let numberOfNumbers = 5;

const numbersOutput = document.getElementById("numbers");
const locksOutput = document.getElementById("locks");
const spinButton = document.getElementById("spin");

spinButton.addEventListener("click", spinButtonClicked);

let numberArray = [];
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
    for(let i = 0; i < numberOfNumbers; i++) {
        if(!numberArray[i].locked) {
            numberArray[i].num = (Math.floor(Math.random() * 10));
            numberArray[i].display.innerHTML = numberArray[i].num;
        }
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