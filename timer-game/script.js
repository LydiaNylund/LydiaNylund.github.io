let pageText = document.getElementById("pageText");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let currentTime;
let startTime;
let stopTime;
let output = document.createElement("div");

startButton.addEventListener("click", onStartButtonClicked);
stopButton.addEventListener("click", onStopButtonClicked);






function onStartButtonClicked() {
    if(output) {
        output.innerHTML = "";
    }
    currentTime = new Date();
    startTime = currentTime.getTime();
    startButton.classList.add("hide");
    stopButton.classList.remove("hide");
}

function onStopButtonClicked() {
    
    currentTime = new Date();
    stopTime = currentTime.getTime();
    startButton.classList.remove("hide");
    stopButton.classList.add("hide");

    let millisec = (stopTime - startTime) / 1000;
    let secToTen = 10 - millisec;

    pageText.appendChild(output);
    output.innerHTML = `Det har gått ${millisec.toFixed(2)} sekunder. <br>
                        Det är ${Math.abs(secToTen.toFixed(2))} sekunder från 10s.`;
}
