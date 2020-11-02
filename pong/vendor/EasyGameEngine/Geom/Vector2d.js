export class Vector2d {
  /**
   * Create an object that holds an x and y value.
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    /** @type {number} */
    this.x = x || 0;

    /** @type {number} */
    this.y = y || 0;
  }

  /**
   * Set x and y.
   * @param {number} x 
   * @param {number} y 
   */
  set(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  /**
   * Adds the given value to x and y.
   * @param {Vector2d|number} value 
   */
  add(value) {
    if(Vector2d.isVector2d(value)) {
      this.x += value.x;
      this.y += value.y;
    }
    else {
      this.x += value;
      this.y += value;
    }
    return this;
  }

  /**
   * Subtracts the given value from x and y.
   * @param {Vector2d|number} value 
   */
  subtract(value) {
    if(Vector2d.isVector2d(value)) {
      this.x -= value.x;
      this.y -= value.y;
    }
    else {
      this.x -= value;
      this.y -= value;
    }
    return this;
  }

  /**
   * Multiplies the given value to x and y.
   * @param {Vector2d|number} value 
   */
  multiply(value) {
    if(Vector2d.isVector2d(value)) {
      this.x *= value.x;
      this.y *= value.y;
    }
    else {
      this.x *= value;
      this.y *= value;
    }
    return this;
  }

  /**
   * Divides x and y with the given value.
   * @param {Vector2d|number} value 
   */
  divide(value) {
    if(Vector2d.isVector2d(value)) {
      this.x /= value.x;
      this.y /= value.y;
    }
    else {
      this.x /= value;
      this.y /= value;
    }
    return this;
  }

  /**
   * Normalizes the length of this vector to be 1.
   */
  normalize() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x /= length; 
    this.y /= length;
  }

  /**
   * Returns the distance between this and another vector.
   * @param {Vector2d} other
   * @returns {number} 
   */
  distance(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  /**
   * Returns true if the given argument is a Vector2d object.
   * @param {any} obj
   * @returns {boolean} 
   */
  static isVector2d(obj) {
    return obj instanceof this;
  }

  /**
   * Returns the distance between 2 vectors.
   * @param {Vector2d} vector1
   * @param {Vector2d} vector2
   * @returns {number} 
   */
  static distance(vector1, vector2) {
    const dx = vector1.x - vector2.x;
    const dy = vector1.y - vector2.y;
    return Math.sqrt(dx*dx + dy*dy);
  }
}