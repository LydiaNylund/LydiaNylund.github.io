import { GameObject } from "../../../vendor/EasyGameEngine/GameObject.js";
import { Colors} from '../../../vendor/EasyGameEngine/Graphics/Color.js';
import { BoxShape } from "../../../vendor/EasyGameEngine/Graphics/BoxShape.js";
import { Box } from "../../../vendor/EasyGameEngine/Geom/Box.js";
import { Vector2d } from "../../../vendor/EasyGameEngine/Geom/Vector2d.js";
import { KeyCodes } from "../../../vendor/EasyGameEngine/Input.js";


export class Player extends GameObject {

    constructor(x, y) {
        super(x, y);
        this.body = new Box(0, 0, 10, 70);
        this.body.position = this.transform.position;
        this.speed = 10;
        this.graphic = new BoxShape(this.body.size.x, this.body.size.y, Colors.white());
        this._moveDirection = new Vector2d();
    }

    update(deltaTime, elapsedTime) {
        this._updateMovemenDirection();
        this._updateMovement();
        this._checkBorders();
    }
    
    _updateMovemenDirection() {
        this._moveDirection.set(0, 0);
        
        this._moveDirection.y += this.input.getKey(KeyCodes.upArrow)    ? -1 : 0;
        this._moveDirection.y += this.input.getKey(KeyCodes.downArrow)  ? 1 : 0;

        if((this._moveDirection.y) !== 0) {
            this._moveDirection.normalize();
          }
    }

    _updateMovement() {
        this.transform.position.y += this.speed * this._moveDirection.y;
    }


    _checkBorders() {
        if(this.body.position.y > 600 - 35 ) {
            this.body.position.y = 600 - 35;
        }
        if(this.body.position.y < 0 + 35 ) {
            this.body.position.y = 0 + 35;
        }
    }

}