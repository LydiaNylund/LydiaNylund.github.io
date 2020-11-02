import { GameObject } from "../../../vendor/EasyGameEngine/GameObject.js";
import { Colors} from '../../../vendor/EasyGameEngine/Graphics/Color.js';
import { CircleShape } from "../../../vendor/EasyGameEngine/Graphics/CircleShape.js";
import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";
import { Box } from "../../../vendor/EasyGameEngine/Geom/Box.js";


let points = document.getElementById("points");


export class Enemy extends GameObject {

    constructor(x, y, speed) {
        super(x, y);

        this.velocity = new Vector2d();

        this.target = new Vector2d();
        this.speed = speed;

        this.body = new Box(0, 0, 20, 20);
        this.body.position = this.transform.position;

        this.graphic = new CircleShape(10, Colors.white());

        this.velocity = new Vector2d(this.speed, this.speed);

    }

    update() {
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;
        this._checkCollide();
    }
    _checkCollide() {
        if(this.body.position.x > 800 - this.graphic.radius) {
            this.body.position.x = 400;
            this.body.position.y = 300;
            points.innerHTML = 0;
        }
        if(this.body.position.x < 0 + this.graphic.radius) {
            this.body.position.x = 400;
            this.body.position.y = 300;
            points.innerHTML = 0;
        }
        if(this.body.position.y > 600 - this.graphic.radius) {
            this.velocity.y *= -1
        }
        if(this.body.position.y < 0 + this.graphic.radius) {
            this.velocity.y *= -1
        }
    }

}