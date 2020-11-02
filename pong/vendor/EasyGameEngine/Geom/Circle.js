import { Vector2d } from "./Vector2d.js";

export class Circle {
  /**
   * Creates a new circle object (geometry).
   * @param {number} x 
   * @param {number} y 
   * @param {number} radius 
   */
  constructor(x, y, radius) {
    /** @type {Vector2d} */
    this.position = new Vector2d(x, y);
    
    /** @type {number} */
    this.radius = radius || 0;  
  }

  /**
   * Returns true if this circle overlaps another circle.
   * @param {Circle} other
   * @returns {boolean} 
   */
  overlapCircle(other) {
    return Circle.overlapCircle(this, other);
  }

  /**
   * Returns true if 2 circles overlap.
   * @param {Circle} first 
   * @param {Circle} second 
   * @returns {boolean}
   */
  static overlapCircle(first, second) {
    return first.position.distance(second.position) < (first.radius + second.radius);
  }
}