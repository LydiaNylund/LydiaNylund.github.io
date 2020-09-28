let page = document.getElementById("page");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
let currentTime;
let startTime;
let stopTime;

startButton.addEventListener("click", onStartButtonClicked);
stopButton.addEventListener("click", onStopButtonClicked);






function onStartButtonClicked() {
    currentTime = new Date();
    startTime = currentTime.getTime();
}

function onStopButtonClicked() {
    currentTime = new Date();
    stopTime = currentTime.getTime();


    let millisec = (stopTime - startTime) / 1000;
    let output = document.createElement("div");
    page.appendChild(output);
    output.innerHTML = `Det har gått ${millisec}`;
}
