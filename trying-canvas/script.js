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

let player = new Circle(200, 200, 25, "transparent");
let coin = new Circle(400, 300, 10, "transparent");
let enemy = new Circle(300, 400, 40, "transparent");
let points = 0;
let isGameOver = false;
let maxEnemySpeed = 90;
let minEnemySpeed = 20;

const enemyImg = new Image();
enemyImg.src = 'enemyImg.png';
const enemyHeight = 128;
const enemyWidth = 128;

const playerImg = new Image();
playerImg.src = "playerImg.png";
const playerHeight = 75;
const playerWidth = 75;

const coinImg = new Image();
coinImg.src = "coinImg.png";
const coinHeight = 46;
const coinWidth = 42;






gameOverMessage.classList.add("hide")

let lastFrameTime = new Date();

window.addEventListener("load", () => {
    window.requestAnimationFrame(renderCircle);
})
let prevTimestamp = 0;

function renderCircle(timestamp) {

    let deltaTime = timestamp - prevTimestamp;
    prevTimestamp = timestamp;
    deltaTime = Math.min(0.1, deltaTime);

    c.clearRect(0, 0, canvas.width, canvas.height);

    counter.innerHTML = points;

    player.draw();
    c.drawImage(
        playerImg, 
        0,
        0, 
        playerWidth,
        playerHeight,  
        player.x - player.radius *2 + player.radius /2, 
        player.y - player.radius *2,  
        playerWidth,
        playerHeight,
    );

    let moveDirection = { x: 0, y: 0 };
    // Koll vart den ska röras o lägg:
    // moveDirection.x ti va -1 eller 1 beroende på vänster eller höger.
    // moveDirection.y ti va -1 eller 1 beroende på upp eller ner.
    if(left === true) {
        moveDirection.x += -1;
    }
    if(right === true) {
        moveDirection.x += 1;
    }
    if(up === true) {
        moveDirection.y += -1;
    }
    if(down === true) {
        moveDirection.y += 1;
    }

    if(moveDirection.x != 0 || moveDirection.y != 0) {
            // normalizer x och y ti vara total längd 1.
        moveDirection = normalize2d(moveDirection.x, moveDirection.y);
        
        // Sen använder du den såhär:
        const hastighet = 90;
        player.x += moveDirection.x * hastighet * deltaTime;
        player.y += moveDirection.y * hastighet * deltaTime;
    }

    if(player.x > 800 - player.radius) {
        player.x = 800 - player.radius;
    }
    if(player.y > 600 - player.radius) {
        player.y = 600 - player.radius;
    }
    if(player.x < 0 + player.radius) {
        player.x = 0 + player.radius;
    }
    if(player.y < 0 + player.radius) {
        player.y = 0 + player.radius;
    }

    


    coin.draw();
    c.drawImage(
        coinImg, 
        0,
        0, 
        coinWidth,
        coinHeight,  
        coin.x - coin.radius *2 - coin.radius /5, 
        coin.y - coin.radius *2 - coin.radius /2 ,  
        coinWidth,
        coinHeight,
    );

    
    if(player.overlaps(coin)) {
        coin.x = 50 + Math.random() * (canvas.width - 100);
        coin.y = 50 + Math.random() * (canvas.height - 100);
        points++;
    }
    

    /*if(points == 10) {
        speed = 50;
    }
    if(points == 25) {
        speed = 70;
    }
    if(points == 35) {
        speed = 90;
    }*/



    enemy.draw();      
    c.drawImage(
        enemyImg, 
        0,
        0, 
        enemyWidth,
        enemyHeight,  
        enemy.x - enemy.radius *2 + enemy.radius /2 , 
        enemy.y - enemy.radius *2 + enemy.radius /2 ,  
        enemyWidth,
        enemyHeight,
    );
    

    let enemyMoveDirection = { x: 0, y: 0 };
    

    enemyMoveDirection.x = player.x - enemy.x;
    enemyMoveDirection.y = player.y - enemy.y;

    enemyMoveDirection = normalize2d(enemyMoveDirection.x, enemyMoveDirection.y);
    
    const enemyHastighet = minEnemySpeed + Math.min(points * 2, maxEnemySpeed - minEnemySpeed);
    enemy.x += enemyMoveDirection.x * enemyHastighet * deltaTime;
    enemy.y += enemyMoveDirection.y * enemyHastighet * deltaTime;

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
    counter.style.color = "gold";
    gameOverElement.classList.remove("hide");
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    timerId = setTimeout(`gameOverMessage.classList.remove("hide")`, 1000);
    player.draw();
    c.drawImage(
        playerImg, 
        75,
        0, 
        playerWidth,
        playerHeight,  
        player.x - player.radius *2 + player.radius /2, 
        player.y - player.radius *2, 
        playerWidth,
        playerHeight,
    );
    coin.draw();
    c.drawImage(
        coinImg, 
        43,
        0, 
        coinWidth,
        coinHeight,  
        coin.x - coin.radius *2 - coin.radius /5, 
        coin.y - coin.radius *2 - coin.radius /2 ,  
        coinWidth,
        coinHeight,
    );
    enemy.draw();
    c.drawImage(
        enemyImg, 
        128,
        0, 
        enemyWidth,
        enemyHeight,  
        enemy.x - enemy.radius *2 + enemy.radius /2 , 
        enemy.y - enemy.radius *2 + enemy.radius /2 ,  
        enemyWidth,
        enemyHeight,
    );

    window.addEventListener("keydown", pressSpace);
}

function normalize2d(x, y) {
    const length = Math.sqrt(x * x + y * y);
    return { 
        x: x / length, 
        y: y / length
    };
}

