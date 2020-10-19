const canvas = document.getElementById("canvas");
let key;
let x = 200;
let y = 200;
let left;
let right;
let up;
let down;

canvas.width = 800;
canvas.height = 600;

let c = canvas.getContext("2d");

window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);


window.requestAnimationFrame(renderCircle) 

function renderCircle() {
    c.clearRect(0, 0, window.innerHeight, window.innerWidth);
    c.beginPath();
    c.arc(x, y, 40, 0, Math.PI * 2, false);
    c.fillStyle = "crimson";
    c.fill();

    if(left === true) {
        x--;
    }
    else if(right === true) {
        x++;
    }
    else if(up === true) {
        y--;
    }
    else if(down === true) {
        y++;
    }
 

    window.requestAnimationFrame(renderCircle) 
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

renderCircle()
