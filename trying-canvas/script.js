const canvas = document.getElementById("canvas");
const counter = document.getElementById("counter");
const gameOverElement = document.getElementById("gameOver");
const gameOverMessage = document.getElementById("gameOverMessage");
let key;
let left;
let right;
let up;
let down;
let timerId;

canvas.width = 800;
canvas.height = 600;

let c = canvas.getContext("2d");

window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);

let player = new Circle(200, 200, 40, "crimson");
let coin = new Circle(400, 300, 10, "orange");
let enemy = new Circle(300, 400, 30, "black");
let points = 0;
let isGameOver = false;


gameOverMessage.classList.add("hide")

let lastFrameTime = new Date();

window.addEventListener("load", () => {
    window.requestAnimationFrame(renderCircle);
})


function renderCircle() {

    let frameTime = new Date();
    let deltaTime = (frameTime.getTime() - lastFrameTime.getTime()) / 1000;
    lastFrameTime = frameTime;
        
    c.clearRect(0, 0, canvas.width, canvas.height);

    counter.innerHTML = points;

    player.draw();


    if(left === true) {
        player.x -= 100 * deltaTime;
    }
    if(right === true) {
        player.x += 100 * deltaTime;
    }
    if(up === true) {
        player.y -= 100 * deltaTime;
    }
    if(down === true) {
        player.y += 100 * deltaTime;
    }
 
    
    coin.draw();

    
    if(player.overlaps(coin)) {
        coin.x = Math.floor(Math.random() * 800)
        coin.y = Math.floor(Math.random() * 600)
        points++;
    }


    enemy.draw();

    if(player.x < enemy.x) {
        enemy.x -= 50 * deltaTime;
    }
    else {
        enemy.x += 50 * deltaTime;
    }
    if(player.y < enemy.y) {
        enemy.y -= 50 * deltaTime;
    }
    else {
        enemy.y += 50 * deltaTime;
    }

    if(player.overlaps(enemy)) {
        onGameOver();
    }
    else if(isGameOver === false) {
        window.requestAnimationFrame(renderCircle) 
    }
    

}




function keyDown(event) {
    if(event.keyCode === 39) {
        right = true;
    }
    else if(event.keyCode === 37) {
        left = true;
    }
    else if(event.keyCode === 38) {
        up = true;
    }
    else if(event.keyCode === 40) {
        down = true;
    }
    else {
        return;
    }
}
function keyUp(event) {
    if(event.keyCode === 39) {
        right = false;
    }
    else if(event.keyCode === 37) {
        left = false;
    }
    else if(event.keyCode === 38) {
        up = false;
    }
    else if(event.keyCode === 40) {
        down = false;
    }
    else {
        return;
    }
}

function pressSpace(event) {
    if(event.key === " ") {
        canvas.style.backgroundColor = "white";
        player.color = "crimson";
        enemy.color = "black";
        coin.color = "orange";
        counter.style.color = "black";
        gameOverElement.classList.add("hide");
        gameOverMessage.classList.add("hide");

        player.x = 200;
        player.y = 200;     
        enemy.x = 300;
        enemy.y = 400;
        coin.x = 400;
        coin.y = 300;

        points = 0;
        isGameOver = false;

        clearTimeout(timerId);
        window.removeEventListener("keydown", pressSpace);

        window.requestAnimationFrame(renderCircle);
    }

}


function onGameOver() {
    canvas.style.backgroundColor = "rgb(44, 44, 44)";
    player.color = "rgb(95, 51, 54)";
    enemy.color = "rgb(29, 29, 29)";
    coin.color = "rgb(87, 67, 49)";
    counter.style.color = "gold";
    gameOverElement.classList.remove("hide");
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    timerId = setTimeout(`gameOverMessage.classList.remove("hide")`, 1000);
    player.draw();
    coin.draw();
    enemy.draw();

    window.addEventListener("keydown", pressSpace);
}

