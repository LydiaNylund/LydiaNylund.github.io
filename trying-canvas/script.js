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

let points = 0;
let isGameOver = false;

let enemy = new Circle(300, 400, 40, "transparent");
const enemyImg = new Image();
enemyImg.src = 'enemyImg.png';
const enemyHeight = 128;
const enemyWidth = 128;
let maxEnemySpeed = 90;
let minEnemySpeed = 20;
let enemyTargetX = 50 + Math.random() *(canvas.width - 100);
let enemyTargetY = 50 + Math.random() *(canvas.height - 100);

let enemy2 = new Circle(700, 50, 30, "yellow");
const enemy2Img = new Image();
enemy2Img.src = 'enemy2Img.png';
const enemy2Height = 128;
const enemy2Width = 128;
let maxEnemy2Speed = 70;
let minEnemy2Speed = 30;
let enemy2TargetX = 50 + Math.random() *(canvas.width - 100);
let enemy2TargetY = 50 + Math.random() *(canvas.height - 100);

let player = new Circle(200, 200, 25, "transparent");
const playerImg = new Image();
playerImg.src = "playerImg.png";
const playerHeight = 75;
const playerWidth = 75;

let coin = new Circle(400, 300, 10, "transparent");
const coinImg = new Image();
coinImg.src = "coinImg.png";
const coinHeight = 45;
const coinWidth = 42;

let prevTimestamp = 0;
let currentFrame = 0;
let currentEnemyFrame = 0;
let currentEnemy2Frame = 0;
let currentCoinFrame = 0;





gameOverMessage.classList.add("hide")

let lastFrameTime = new Date();

window.addEventListener("load", () => {
    window.requestAnimationFrame(renderCircle);
})

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
        playerWidth * (Math.floor(currentFrame) % 2), 
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
        moveDirection = normalize2d(moveDirection.x, moveDirection.y, currentFrame += 0.2);
        
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
        coinHeight * (Math.floor(currentCoinFrame) % 4), 
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
    
    currentCoinFrame += 0.1;

    enemy.draw();      
    c.drawImage(
        enemyImg, 
        0,
        enemyHeight  * (Math.floor(currentEnemyFrame) % 2),
        enemyWidth,
        enemyHeight,  
        enemy.x - enemy.radius *2 + enemy.radius /2 , 
        enemy.y - enemy.radius *2 + enemy.radius /2 ,  
        enemyWidth,
        enemyHeight,
    );
    

    let enemyMoveDirection = { x: 0, y: 0 };
    
    enemyMoveDirection.x = enemyTargetX - enemy.x;
    enemyMoveDirection.y = enemyTargetY - enemy.y;

    enemyMoveDirection = normalize2d(enemyMoveDirection.x, enemyMoveDirection.y, currentEnemyFrame += 0.1);
    
    const enemyHastighet = minEnemySpeed + Math.min(points * 2, maxEnemySpeed - minEnemySpeed);
    enemy.x += enemyMoveDirection.x * enemyHastighet * deltaTime;
    enemy.y += enemyMoveDirection.y * enemyHastighet * deltaTime;

    let enemyTargetDistanceX =enemyTargetX - enemy.x;
    let enemyTargetDistanceY = enemyTargetY - enemy.y;


    if(enemyTargetDistanceX < 10 && enemyTargetDistanceY < 50) {
        enemyTargetX = 50 + Math.random() * (canvas.width - 100);
        enemyTargetY = Math.random() * (canvas.height - 100);
    }

    enemy2.draw();
    c.drawImage(
        enemy2Img, 
        0,
        enemy2Height  * (Math.floor(currentEnemy2Frame) % 2),
        enemy2Width,
        enemy2Height,  
        enemy2.x - enemy2.radius *2, 
        enemy2.y - enemy2.radius *2 - enemy2.radius /2 ,  
        enemy2Width,
        enemy2Height,
    );


    let enemy2MoveDirection = { x: 0, y: 0 };

    enemy2MoveDirection.x = enemy2TargetX - enemy2.x;
    enemy2MoveDirection.y = enemy2TargetY - enemy2.y;

    enemy2MoveDirection = normalize2d(enemy2MoveDirection.x, enemy2MoveDirection.y, currentEnemy2Frame += 0.1);
    
    const enemy2Hastighet = minEnemy2Speed + Math.min(points, maxEnemy2Speed - minEnemy2Speed);
    enemy2.x += enemy2MoveDirection.x * enemy2Hastighet * deltaTime;
    enemy2.y += enemy2MoveDirection.y * enemy2Hastighet * deltaTime;


    if(distance(enemy2.x, enemy2.y, enemy.x, enemy.y) < 150) {
        const directionToOtherEnemey = direction(enemy2.x, enemy2.y, enemy.x, enemy.y);
        enemy2.x += directionToOtherEnemey.x * enemy2Hastighet;
        enemy2.y += directionToOtherEnemey.y * enemy2Hastighet;
    }


    if(distance(player.x, player.y, enemy.x, enemy.y) < distance(player.x, player.y, enemy2.x, enemy2.y)) {
        enemyTargetX = player.x;
        enemyTargetY = player.y;
    }
    else {
        enemy2TargetX = player.x;
        enemy2TargetY = player.y;
    }

    


    if(enemy2.x > 800 - enemy2.radius) {
        enemy2.x = 800 - enemy2.radius;
    }
    if(enemy2.y > 600 - enemy2.radius) {
        enemy2.y = 600 - enemy2.radius;
    }
    if(enemy2.x < 0 + enemy2.radius) {
        enemy2.x = 0 + enemy2.radius;
    }
    if(enemy2.y < 0 + enemy2.radius) {
        enemy2.y = 0 + enemy2.radius;
    }

    let enemy2TargetDistanceX =enemy2TargetX - enemy2.x;
    let enemy2TargetDistanceY = enemy2TargetY - enemy2.y;


    if(enemy2TargetDistanceX < 10 && enemy2TargetDistanceY < 50) {
        enemy2TargetX = 50 + Math.random() * (canvas.width - 100);
        enemy2TargetY = 50 + Math.random() * (canvas.height - 100);
    }

    if(player.overlaps(enemy)) {
        onGameOver();
    }
    else if(player.overlaps(enemy2)) {
        onGameOver();
    }
    else if(isGameOver === false) {
        window.requestAnimationFrame(renderCircle) 
    }
    

}

function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  function direction(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return normalize2d(dx, dy);
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
        enemy2.x = 700;
        enemy2.y = 50;

        enemyTargetX = 50 + Math.random() *(canvas.width - 100);
        enemyTargetY = 50 + Math.random() *(canvas.width - 100);
        enemy2TargetX = 50 + Math.random() *(canvas.width - 100);
        enemy2TargetY = 50 + Math.random() *(canvas.width - 100);

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
    enemy2.draw();
    c.drawImage(
        enemy2Img, 
        128,
        0,
        enemy2Width,
        enemy2Height,  
        enemy2.x - enemy2.radius *2, 
        enemy2.y - enemy2.radius *2 - enemy2.radius /2 ,  
        enemy2Width,
        enemy2Height,
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

