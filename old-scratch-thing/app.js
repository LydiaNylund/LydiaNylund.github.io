const canvasElement = document.getElementById("canvas");
const text = document.getElementById("text");
const counter = document.getElementById("counter");
const progressbar = document.getElementById("progressBar");
const bar = document.getElementById("bar");
const timer = document.getElementById("timer");

const c = canvasElement.getContext("2d");

canvasElement.width = 800;
canvasElement.height = 600;
canvasElement.style.backgroundColor = "lightgrey";

text.textContent = "Click to  start";
let tries = 0;
counter.textContent = tries;

let foodEaten = 0;

let colorNumber = 0;
let playerColors = [
    "purple", "green", "orange", "magenta", "cyan"
];

let enemy = new Circle(100, 100, 20, 20, "red");
let food = new Circle(90, 90, 5, 5, "blue");
let player = new Circle(0, 0, 10, 10, playerColors[colorNumber]);

let enemySpeed = 1;

let velocity = { x: 0, y: 0 };
let foodVelocity = { x: 0, y: 0 };
let prevTimestamp = 0;
let deltaTime;

let mouseX;
let mouseY;

let progress = 100 / playerColors.length;

canvasElement.addEventListener("click", onMouseClick);
canvasElement.addEventListener("mousemove", onMouseMovement);


function gameLoop(timestamp) {
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = timestamp;
    deltaTime = Math.min(0.1, deltaTime);

    player.x = mouseX;
    player.y = mouseY;

    
    if(enemy.x < player.x) {
        velocity.x += 1;
    }
    if(enemy.x > player.x) {
        velocity.x -= 1;
    }
    if(enemy.y < player.y) {
        velocity.y += 1;
    }
    if(enemy.y > player.y) {
        velocity.y -= 1;
    }
    

    normalize2d(velocity.x, velocity.y);

    enemy.x += velocity.x * enemySpeed * deltaTime;
    enemy.y += velocity.y * enemySpeed * deltaTime;

    if(enemy.x < 0) {
        enemy.x = 0;
        velocity.x = 0;
    }
    if(enemy.x > 800) {
        enemy.x = 800;
        velocity.x = 0;
    }
    if(enemy.y < 0) {
        enemy.y = 0;
        velocity.y = 0;
    }
    if(enemy.y > 600 ) {
        enemy.y = 600;
        velocity.y = 0;
    }

    if(food.x < enemy.x) {
        foodVelocity.x += 1;
    }
    if(food.x > enemy.x) {
        foodVelocity.x -= 1;
    }
    if(food.y < enemy.y) {
        foodVelocity.y += 1;
    }
    if(food.y > enemy.y) {
        foodVelocity.y -= 1;
    }

    normalize2d(foodVelocity.x, foodVelocity.y);

    food.x += foodVelocity.x * 2 * deltaTime;
    food.y += foodVelocity.y * 2 * deltaTime;

    if(food.x > enemy.x + 100) {
        food.x = enemy.x + 100;
    }
    if(food.x < enemy.x - 100) {
        food.x = enemy.x - 100;
    }
    if(food.y > enemy.y + 100) {
        food.y = enemy.y + 100;
    }
    if(food.y < enemy.y - 100) {
        food.y = enemy.y - 100;
    }

    if(player.radius >= enemy.radius) {
        enemy.color = "blue";
    }

    c.clearRect(0, 0, canvas.width, canvas.height);
    
    enemy.displayRadius += (enemy.radius - enemy.displayRadius) * 0.1;
    enemy.draw();

    if(player.overlaps(food)) {
        player.radius += 2;
        if(food.x < enemy.x) {
            food.x += 100;
        }
        else {
            food.x -= 100;
        }
        if(food.y < enemy.y) {
            food.y += 100;
        }
        else {
            food.y -= 100;
        }
    }
    else {
        food.draw();
    }

    
    player.displayRadius += (player.radius - player.displayRadius) * 0.1;
    player.draw();
    

    if(player.overlaps(enemy) && player.radius < enemy.radius) {
        gameOver();
    }
    else if(player.overlaps(enemy) && player.radius >= enemy.radius) {
        colorNumber++;
        enemySpeed += 0.5;
        player.radius = 10;
        player.displayRadius += (player.radius - player.displayRadius) * 0.1;
        bar.style.width = progress + "%";
        progress += 100 / playerColors.length;
        
        if(colorNumber >= playerColors.length) {
            youWin();
        }
        else {
            if(enemy.x < canvasElement.width / 2) {
                enemy.x += 250;
            }
            else {
                enemy.x -= 250;
            }
            velocity.x = 0;
            velocity.y = 0;
            enemy.radius += 10;
            enemy.color = player.color;
            player.color = playerColors[colorNumber];
    
            requestAnimationFrame(gameLoop);
        }
    }
    else {
        requestAnimationFrame(gameLoop);
    }
}

function onMouseMovement(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}


function gameOver() {
    canvasElement.style.backgroundColor = "grey";
    enemy.color = "black";
    food.color = "lightgrey";
    player.color = "white";
    progressbar.style.border = "rgb(59, 59, 59) 1px solid";
    enemy.draw();
    food.draw();
    player.draw();
    canvasElement.addEventListener("click", onMouseClick);
    text.textContent = "click to restart"
}

function normalize2d(x, y) {
    const length = Math.sqrt(x * x + y * y);
    return { 
        x: x / length, 
        y: y / length
    };
}

function onMouseClick() {
    text.textContent = "";
    enemy.x = 100;
    enemy.y = 100;
    food.x = 90;
    food.y = 90;
    player.radius = 10;
    enemy.radius = 20;
    enemySpeed = 1;

    velocity.x = 0;
    velocity.y = 0;

    canvasElement.style.backgroundColor = "lightgrey";
    enemy.color = "red";
    food.color = "blue";
    player.color = "purple";
    colorNumber = 0;
    progressbar.style.border = "rgb(126, 126, 126) 1px solid";
    bar.style.width = "1%";
    progress = 100 / playerColors.length;

    tries++;

    canvasElement.removeEventListener("click", onMouseClick);
    if(tries === 1) {
        food.x = 100;
        food.y = 480;
        enemy.x = 700;
        enemy.y = 580;
        requestAnimationFrame(tutorial);
    }
    else {
        counter.textContent = tries;
        requestAnimationFrame(gameLoop);
    }
}
function youWin() {
    text.textContent = "YOU WON!";
    currentTime = new Date();
    startTime = currentTime.getTime();
    canvasElement.addEventListener("click", onMouseClick);
}

function tutorial(timestamp) {
    
    deltaTime = timestamp - prevTimestamp;
    prevTimestamp = timestamp;
    deltaTime = Math.min(0.1, deltaTime);

    player.x = mouseX;
    player.y = mouseY;

    
    c.clearRect(0, 0, canvas.width, canvas.height);


    if(foodEaten > 3) {

        if(enemy.x < player.x) {
            velocity.x += 1;
        }
        if(enemy.x > player.x) {
            velocity.x -= 1;
        }
        if(enemy.y < player.y) {
            velocity.y += 1;
        }
        if(enemy.y > player.y) {
            velocity.y -= 1;
        }

        if(player.radius >= enemy.radius) {
            enemy.color = "blue";
        }

        normalize2d(velocity.x, velocity.y);

        enemy.x += velocity.x * enemySpeed * deltaTime;
        enemy.y += velocity.y * enemySpeed * deltaTime;

        if(enemy.x < 0) {
            enemy.x = 0;
            velocity.x = 0;
        }
        if(enemy.x > 800) {
            enemy.x = 800;
            velocity.x = 0;
        }
        if(enemy.y < 0) {
            enemy.y = 0;
            velocity.y = 0;
        }
        if(enemy.y > 600 ) {
            enemy.y = 600;
            velocity.y = 0;
        }

        if(food.x < enemy.x) {
            foodVelocity.x += 1;
        }
        if(food.x > enemy.x) {
            foodVelocity.x -= 1;
        }
        if(food.y < enemy.y) {
            foodVelocity.y += 1;
        }
        if(food.y > enemy.y) {
            foodVelocity.y -= 1;
        }
    
        normalize2d(foodVelocity.x, foodVelocity.y);
    
        food.x += foodVelocity.x * 2 * deltaTime;
        food.y += foodVelocity.y * 2 * deltaTime;
    
        if(food.x > enemy.x + 100) {
            food.x = enemy.x + 100;
        }
        if(food.x < enemy.x - 100) {
            food.x = enemy.x - 100;
        }
        if(food.y > enemy.y + 100) {
            food.y = enemy.y + 100;
        }
        if(food.y < enemy.y - 100) {
            food.y = enemy.y - 100;
        }
       
        enemy.draw();
    }

    player.draw();
    
    if(player.overlaps(food)) {
        player.radius += 2;
        foodEaten++;
        food.x += 130;
        food.y -= 100;
    }
    else {
        food.draw();
    }
    player.displayRadius += (player.radius - player.displayRadius) * 0.1;

    if(player.overlaps(enemy) && player.radius < enemy.radius) {
        foodEaten = 0;
        tries = 0;
        gameOver();
    }
    else if(player.overlaps(enemy) && player.radius >= enemy.radius) {
        enemy.x = 100;
        enemy.y = 100;
        food.x = 90;
        food.y = 90;
        player.radius = 40;
        enemy.radius = 20;
        enemySpeed = 1;
        player.radius = 10;
        player.displayRadius += (player.radius - player.displayRadius) * 0.1;

        velocity.x = 0;
        velocity.y = 0;

        canvasElement.style.backgroundColor = "lightgrey";
        enemy.color = "red";
        food.color = "blue";
        player.color = "purple";
        colorNumber = 0;
        progressbar.style.border = "rgb(126, 126, 126) 1px solid";
        bar.style.width = "1%";
        progress = 100 / playerColors.length;

        counter.textContent = tries;

        requestAnimationFrame(gameLoop);
    }
    else {
        requestAnimationFrame(tutorial);
    }
}