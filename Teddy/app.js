const canvasElement = document.getElementById("canvas");
const c = canvasElement.getContext("2d");

canvasElement.height = 600;
canvasElement.width = 800;
canvasElement.style.backgroundColor = "grey";
canvasElement.style.border = "black 10px solid";

let deltaTime;
let prevTimestamp;

let up;
let down;
let right;
let left;
let space;

let ground = new Ground(0, 550, 0, 800, 100, "white");
let = tree2 = new Ground(404, 520, -15, 60, 30, "brown");
let = snow = new Ground(500, 520, -15, 30, 30, "red");
let = stone = new Ground(700, 450, -25, 100, 100, "darkgrey");

let player = new Player(340, 505, 0, 30, 45, "gold");

/*const level1 = [
    ground = new Ground(0, 550, 0, 800, 100, "white"),
    //tree1 = new Ground(400, 370, -15, 60, 100, "brown"),
    tree2 = new Ground(404, 520, -15, 60, 30, "brown"),
    //tree3 = new Ground(408, 550, -15, 60, 100, "brown"),   
    snow = new Ground(500, 520, -15, 30, 30, "red"),   
    stone = new Ground(700, 450, -25, 100, 100, "darkgrey"),  
]

const level2 = [
    ground = new Ground(0, 550, 0, 800, 100, "white"),
    stone = new Ground(0, 450, -25, 100, 100, "darkgrey"),
]

let level = level1;


console.log(level);
console.log(playerCollidesWith);

for(let i = 0; i < level.length; i++) {
    playerCollidesWith.push(level[i]);
}
*/
let playerCollidesWith = [
    ground,
    tree2,
    snow,
    stone
];

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);


window.requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
    window.requestAnimationFrame(gameLoop);


    deltaTime = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    deltaTime = Math.min(0.1, deltaTime);

    if(right) {
        player.x += deltaTime * 90;
    }
    if(left) {
        player.x -= deltaTime * 90;
    }
    /*if(down) {
        player.y += deltaTime * 90;
    }
    if(up) {
        player.y -= deltaTime * 90;
    }*/

    if(player.x < 0) {
        player.x = 0;
    }
    if(player.x > 800 - player.width) {
        player.x = 800 - player.width;
        
    }
    
    if(player.y < 400 - player.height + 6) {
        player.y = 400 - player.height + 6;
    }
    if(player.y > 600 - player.height) {
        player.y = 600 - player.height;
    }

    playerMoveY(); 
    playerMoveX();

    
    c.clearRect(0, 0, canvas.width, canvas.height);


    /*for(let i = 0; i < level1.length; i++) {
        level1[i].draw();
    }*/
    ground.draw();
    tree2.draw();
    snow.draw();
    stone.draw();

    player.draw();
}

function keyDown(event) {
    let keyPressed = event.key;
    if(keyPressed === "d") {
        right = true;
    }
    else if(keyPressed === "a") {
        left = true;
    }
    else if(keyPressed === "w") {
        up = true;
    }
    else if(keyPressed === "s") {
        down = true;
    }
    else if(keyPressed === " ") {
        space = true;
    }
    else {
        return;
    }
}

function keyUp(event) {
    let keyPressed = event.key;
    if(keyPressed === "d") {
        right = false;
    }
    else if(keyPressed === "a") {
        left = false;
    }
    /*else if(keyPressed === "w") {
        up = false;
    }
    else if(keyPressed === "s") {
        down = false;
    }*/
    else if(keyPressed === " ") {
        space = false;
    }
    else {
        return;
    }
}

function playerMoveY() {
    for(let i = 0; i < playerCollidesWith.length; i++) {
      const other = playerCollidesWith[i];
      if(player.overlaps(other)) {
        if(player.y < other.y) {
            player.y = other.y + other.height;
        }
      }
      else {
          player.y = 505;
      }
    }
}

function playerMoveX() {
    let pHeight = player.height;
    for(let i = 0; i < playerCollidesWith.length; i++) {
      const other = playerCollidesWith[i];
      if(player.overlaps(snow)) {
        pHeight += snow.height;
        if(right) {
            player.x += deltaTime * 20;
            snow.x += deltaTime * 20;
        }
        if(left) {
            player.x -= deltaTime * 20;
            snow.x -= deltaTime * 20;
        }
      }
      if(snow.overlaps(stone)) {
        snow.x = stone.x - snow.width;
      }
      if(player.overlaps(other)) {
        if(player.x < other.x) {
            if(space && pHeight > (other.height / 2)) {
                player.y = other.y - player.height;
            }
            else {
                player.x = other.x - player.width;
            }
        }
        else {
            if(space) {
                player.y = other.y - player.height; 
            }
            else {
                player.x = other.x + other.width;             
            }  
        }
      }
    }
}

