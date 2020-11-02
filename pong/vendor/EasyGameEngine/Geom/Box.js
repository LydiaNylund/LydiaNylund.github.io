import { Vector2d } from "./Vector2d.js";

export class Box {
  /**
   * Creates a new box object (geometry).
   * @param {number} x 
   * @param {number} y 
   * @param {number} width
   * @param {number} height 
   */
  constructor(x, y, width, height) {
    /** @type {Vector2d} */
    this.position = new Vector2d(x, y);
    
    /** @type {Vector2d} */
    this.size = new Vector2d(width, height); 
  }

  /**
   * Returns true if this box overlaps another box.
   * @param {Box} other
   * @returns {boolean} 
   */
  overlapBox(other) {
    return Box.overlapBox(this, other);
  }

  /**
   * Returns true if 2 boxes overlap.
   * @param {Box} first 
   * @param {Box} second 
   * @returns {boolean}
   */
  static overlapBox(first, second) {
    const x1 = first.position.x - first.size.x / 2;
    const y1 = first.position.y - first.size.y / 2;
    const x2 = second.position.x - second.size.x / 2;
    const y2 = second.position.y- second.size.y / 2;
    return (
      x1 < x2 + second.size.x &&
      x1 + first.size.x > x2 &&
      y1 < y2 + second.size.y &&
      y1 + first.size.y > y2
    );
  }
}