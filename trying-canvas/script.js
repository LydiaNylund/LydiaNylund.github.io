const canvas = document.getElementById("canvas");
let key;
let x = 200;
let y = 200;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

window.addEventListener("keydown", keyPressed);

renderCircle()


function renderCircle() {
    c.clearRect(0, 0, innerHeight, innerWidth);
    c.beginPath();
    c.arc(x, y, 40, 0, Math.PI * 2, false);
    c.fillStyle = "crimson";
    c.fill();
}

function keyPressed(event) {
    key = event.key;
    if(event.keyCode === 39) {
        x++;
    }
    else if(event.keyCode === 37) {
        x--;
    }
    else if(event.keyCode === 38) {
        y--;
    }
    else if(event.keyCode === 40) {
        y++;
    }
    else {
        return;
    }
    renderCircle()
}
