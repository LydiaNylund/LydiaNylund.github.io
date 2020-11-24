const canvasElement = document.getElementById("canvas");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const clearButton = document.getElementById("clearButton");


const canvas = canvasElement.getContext("2d");

let rowCount = 80;
let columnCount = 60;
let cellSize = 10;
let cell = [];
let start;
let column;
let row;
let stopping = true;
let cellCopy = [];

canvasElement.width = rowCount * cellSize;
canvasElement.height = columnCount *  cellSize;
canvasElement.style.border = "1px solid grey";

startButton.style.border = "1px solid grey"
stopButton.style.border = "1px solid grey"
clearButton.style.border = "1px solid grey"


startButton.addEventListener("click", startButtonClicked);
stopButton.addEventListener("click", stopButtonClicked);
clearButton.addEventListener("click", clearButtonClicked);
canvasElement.addEventListener("click", whenClicked);

killAllCells();
loop()

function loop() { 
    copyCells();

    for(let r = 0; r < rowCount; r++) {      
        for(let c = 0; c < columnCount; c++) {
            x = r * cellSize;
            y = c * cellSize;

            canvas.strokeStyle = "gray";
            canvas.strokeRect(x, y, cellSize, cellSize);

            if(cell[r][c] === true) {
                canvas.beginPath();
                canvas.rect(x, y, cellSize, cellSize);
                canvas.fillStyle = "red";
                canvas.fill();
            }
            else {
                canvas.beginPath();
                canvas.rect(x, y, cellSize, cellSize);
                canvas.fillStyle = "white";
                canvas.fill();
            }
            
            
            if(stopping === false){
                rules(r, c);
            }
        }
    }
}



function killAllCells() {
    for(let r = 0; r < rowCount; r++) {
        cell[r] = [];
        cellCopy[r] = [];
        for(let c = 0; c < columnCount; c++) {
            cell[r][c] = false;
        }
    }
}

function whenClicked(e) {
    row = Math.floor(e.offsetX / cellSize);
    column = Math.floor(e.offsetY / cellSize);


    if(cell[row][column] === false) {
        cell[row][column] = true;
    }
    else {
        cell[row][column] = false
    }

    loop();
}

function getNeighborAliveCount(r, c) {
    let neighbours = 0;

    
    if(r > 0 && cellCopy[r - 1][c] === true) {
        neighbours++;
    }

    if(r > 0 && c < columnCount - 1 && cellCopy[r - 1][c + 1] === true) {
        neighbours++;
    }

    if(columnCount - 1 && cellCopy[r][c + 1] === true) {
        neighbours++;
    }

    if(r < rowCount - 1 && c < columnCount - 1 && cellCopy[r + 1][c + 1] === true) {
        neighbours++;
    }

    if(r < rowCount - 1 && cellCopy[r + 1][c] === true) {
        neighbours++;
    }

    if(r < rowCount - 1 && c > 0 && cellCopy[r + 1][c - 1] === true) {
        neighbours++;
    }

    if(c > 0 && cellCopy[r][c - 1] === true) {
        neighbours++;
    } 

    if(r > 0 && c > 0 && cellCopy[r - 1][c - 1] === true) {
        neighbours++;
    } 

    return neighbours;
}


function rules(r, c) {
    neighbours = getNeighborAliveCount(r, c);

    if(!cellCopy[r][c] === true && neighbours === 3) {
        cell[r][c] = true;
    }
    else if(cellCopy[r][c] === true && (neighbours < 2 || neighbours > 3)) {
        cell[r][c] = false;
    }

}

function copyCells() {
    for(let r = 0; r < rowCount; r++) {
        for(let c = 0; c < columnCount; c++) {
            cellCopy[r][c] = cell[r][c];
        }
    }
}



function startButtonClicked() {
    stopping = false;
    start = setInterval(loop, 500);
    startButton.style.background = "grey";
    stopButton.style.background = "white";    
}

function stopButtonClicked() {
    stopButton.style.background = "grey"; 
    startButton.style.background = "white";  
    stopping = true;
    clearInterval(start);
}

function clearButtonClicked() {
    startButton.style.background = "white";  
    stopButton.style.background = "white";  
    killAllCells();
    loop();
}
