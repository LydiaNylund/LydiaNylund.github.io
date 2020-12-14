const canvasElement = document.getElementById("canvas");

const c = canvasElement.getContext("2d");

canvasElement.height = 600;
canvasElement.width = 800;
canvasElement.style.backgroundColor = "lightblue";

let key;
let left;
let right;
let up;


let prevTimestamp = 0;
let velocity = { x: 0, y: 0 };
let velocityWall = { x: 0, y: 0 };
let gravity = 700;
let isGrounded = false;
let deltaTime;
let damping = 4;

let ground = new Box(0, 520, 400, 80,"green");
let ground2 = new Box(470, 520, 400, 80, "green");
let block = new Box(200, 400, 80, 120,"brown");
let block2 = new Box(600, 120, 80, 400,"brown");
let block3 = new Box(0, 0, 80, 520,"brown");
let platform = new Box(80, 40, 60, 20,"brown");
let platform2 = new Box(240, 50, 120, 20,"brown");
let platform3 = new Box(460, 80, 80, 20,"brown");

let player = new Box(100, 470, 30, 40, "red");

const playerCollidesWith = [
        ground,
        ground2,
        block,
        block2,
        block3,
        platform,
        platform2,
        platform3
    ];


window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);

window.requestAnimationFrame(loop);

function loop(timestamp) {
    window.requestAnimationFrame(loop);


    //
    // update
    //

    deltaTime = (timestamp - prevTimestamp) / 1000;
    prevTimestamp = timestamp;
    deltaTime = Math.min(0.1, deltaTime);
    velocity.y += gravity * deltaTime;
    velocity.x *= 1 - deltaTime * damping;
    if(isGrounded === true) {
        velocity.x = 0;
    }
    else {
        velocity.x *= 1 - deltaTime * damping;
    }
    if(right) {
        if(isGrounded === true) {
            velocity.x = 120;
        }
        else {
            velocity.x += 800 * deltaTime;
        }
    }
    if(left) {
        if(isGrounded === true) {
            velocity.x = -120;
        }
        else {
            velocity.x -= 800 * deltaTime;
        }
    }
    if(up && isGrounded === true) {
        velocity.y = -300;
        isGrounded = false;
    }
    playerMoveY(velocity.y * deltaTime);
    playerMoveX(velocity.x * deltaTime);
    playerMoveX(velocityWall.x * deltaTime);

    if(player.x < 0){
        player.x = 0;
    }
    if(player.x > 800){
        player.x = 800;
    }
    if(player.y > 600){
        player.y = 470;
        player.x = 100;
    }

    //
    // draw
    //

    c.clearRect(0, 0, canvas.width, canvas.height);

    ground.draw();
    ground2.draw();
    block.draw();
    block2.draw();
    block3.draw();
    platform.draw();
    platform2.draw();
    platform3.draw();

    player.draw();



}


function keyDown(event) {
    if(event.key === "d") {
        right = true;
    }
    else if(event.key === "a") {
        left = true;
    }
    else if(event.key === "w") {
        up = true;
        
    }
    else {
        return;
    }
}
function keyUp(event) {
    if(event.key === "d") {
        right = false;
    }
    else if(event.key === "a") {
        left = false;
    }
    else if(event.key === "w") {
        up = false;
    }
    else {
        return;
    }
}

function playerMoveY(distance) {
    player.y += distance;
    for(let i = 0; i < playerCollidesWith.length; i++) {
      const other = playerCollidesWith[i];
      if(player.overlaps(other)) {
        velocity.y = 0;
        if(player.y < other.y) {
          player.y = other.y - player.height;
          isGrounded = true;
        }
        else {
          player.y = other.y + other.height;
        }
      }
    }
}
function playerMoveX(distance) {
    player.x += distance;
    for(let i = 0; i < playerCollidesWith.length; i++) {
        const other = playerCollidesWith[i];
        if(player.overlaps(other)) {
            if(player.x < other.x) {
                player.x = other.x - player.width -0.1;
                if(up) {
                    velocity.y = -270;
                    velocity.x = -290;
                }
            }
            else {
                player.x = other.x + other.width;
                if(up) {
                    velocity.y = -270;
                    velocity.x = 290;
                }
            }
        }
    }
}