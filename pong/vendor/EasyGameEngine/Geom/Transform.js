import { Vector2d } from "./Vector2d.js";

export class Transform {
  /**
   * Create a new Transform object containing position, scale and rotation.
   * @param {Vector2d} position 
   * @param {number} rotation 
   * @param {Vector2d} scale 
   */
  constructor(position, rotation, scale) {
    /**
     * Position.
     * @type {Vector2d}
     */
    this.position = Vector2d.isVector2d(position) ? position : new Vector2d();

    /**
    * Rotation in degrees [0 - 359].
    * @type {number}
    */
   this.rotation = rotation || 0;

    /**
     * Scale.
     * @type {Vector2d}
     */
    this.scale = Vector2d.isVector2d(scale) ? scale : new Vector2d(1, 1);
  }

  /**
  * Returns true if the given argument is a Transform object.
  * @param {any} obj
  * @returns {boolean} 
  */
  static isTransform(obj) {
    return obj instanceof this;
  }
}