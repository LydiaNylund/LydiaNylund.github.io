import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";
import { Scene } from "../../../vendor/EasyGameEngine/Scene.js";
import { Enemy } from "../Entities/Enemy.js";
import { Player } from './../Entities/Player.js';

let points = document.getElementById("points");



export class PlayScene extends Scene {
    start() {
        this.player1 = this.add(new Player(10, 300));
        this.player2 = this.add(new Player(790, 300));

        this.enemy = this.add(new Enemy(this.width/2, this.height/2, 5));

        points.innerHTML = 0;

    }

    update(deltaTime, elapsedTime) {
        super.update(deltaTime, elapsedTime);


        if(this.player1.body.overlapBox(this.enemy.body)) {
            points.innerHTML++;

            this.enemy.transform.position.x = 
                this.player1.transform.position.x + this.player1.body.size.x / 2 
                + this.enemy.body.size.x / 2;
            
            let direction = new Vector2d(
                this.enemy.transform.position.x - this.player1.transform.position.x,
                this.enemy.transform.position.y - this.player1.transform.position.y
            );
            direction.normalize(direction.x, direction.y) 
            this.enemy.velocity.x = direction.x * this.enemy.speed;
            this.enemy.velocity.y = direction.y * this.enemy.speed;

        }
        
        if(this.player2.body.overlapBox(this.enemy.body)) {
            points.innerHTML++;

            this.enemy.transform.position.x = 
                this.player1.transform.position.x - this.player1.body.size.x / 2 
                - this.enemy.body.size.x / 2;this.enemy.transform.position.x =+ 770;
            let direction = new Vector2d(
                this.enemy.transform.position.x - this.player2.transform.position.x,
                this.enemy.transform.position.y - this.player2.transform.position.y
            );
            direction.normalize(direction.x, direction.y) 
            this.enemy.velocity.x = direction.x * this.enemy.speed;
            this.enemy.velocity.y = direction.y * this.enemy.speed;

        }
    }
}
