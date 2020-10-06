const wordOutput = document.getElementById("wordOutput");
const timeOutput = document.getElementById("timeOutput");
const retryButton = document.getElementById("retryButton");

let words = [ "hoppa","springa", "äta", "sova", "spela", "leka"];
let letter;
let word = 0;
let keyPressed;
let spanElement;

let currentTime;
let startTime;
let stopTime;
let lastItem = words[words.length-1];
let lastCharac = words[word].charAt(words[word].length-1);


window.addEventListener("keydown", onKeyDown);
renderWord()
currentLetter()
retryButton.classList.add("hide");

retryButton.addEventListener("click", retryButtonClicked);

function renderWord() {
    letter = 0;
    let i = 0;
    while (i<words[word].length) {
        spanElement = document.createElement("span");
        spanElement.textContent = words[word].charAt(i);
        spanElement.id = i;
        wordOutput.appendChild(spanElement);
        i++;
    }
    currentLetter()
}


function onKeyDown(event) {
    if( word === words.length && keyPressed == lastCharac) {
        retryButton.classList.remove("hide");
        currentTime = new Date();
        stopTime = currentTime.getTime();

        let millisec = (stopTime - startTime) / 1000;

        timeOutput.innerHTML = `Det tog ${millisec.toFixed(2)} sekunder att skriva orden.`;
    }


    keyPressed = event.key;


    if(word == 0 && keyPressed === words[word].charAt(0)) {
        currentTime = new Date();
        startTime = currentTime.getTime();
    }






    if(keyPressed === words[word].charAt(letter)) {
        if(keyPressed) {
            document.getElementById(letter).classList.remove("current");
        }
        document.getElementById(letter).classList.add("pressed");
        letter++;

        newWord()
        currentLetter()
        
    } 

}


function currentLetter() {
    document.getElementById(letter).classList.add("current");
}


function newWord() {
    if(keyPressed === lastCharac) {
        wordOutput.innerHTML = "";
        word++;
        if(word === 6) {
            onKeyDown()
        }
        else {
            renderWord()
        }

    }
}


function retryButtonClicked() {
    word = 0;
    renderWord();
    timeOutput.innerHTML = "";
    retryButton.classList.add("hide");
}
    