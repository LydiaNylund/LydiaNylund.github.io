export class Color {
  /**
   * Creates an object representing a rgba color.
   * @param {number} r Red [0 - 255]
   * @param {number} g Green [0 - 255]
   * @param {number} b Blue [0 - 255] 
   * @param {number} a Alpha [0 - 1]
   */
  constructor(r=255, g=255, b=255, a=1.0) {
    /**
     * @type {number}
     * @private
     */
    this._r = r;

    /**
     * @type {number}
     * @private
     */
    this._g = g;

    /**
     * @type {number}
     * @private
     */
    this._b = b;

    /**
     * @type {number}
     * @private
     */
    this._a = a;

    /**
     * Color as string.
     * @type {string}
     */
    this.string = '';

    this._updateString();
  }

  /**
   * Red [0 - 255]
   * @type {number}
   */
  get r() {
    return this._r;
  }
  set r(value) {
    this._r = value;
    this._updateString();
  }

  /**
   * Green [0 - 255]
   * @type {number}
   */
  get g() {
    return this._g;
  }
  set g(value) {
    this._g = value;
    this._updateString();
  }

  /**
   * Blue [0 - 255]
   * @type {number}
   */
  get b() {
    return this._b;
  }
  set b(value) {
    this._b = value;
    this._updateString();
  }

  /**
   * Alpha [0 - 1]
   * @type {number}
   */
  get a() {
    return this._a;
  }
  set a(value) {
    this._a = value;
    this._updateString();
  }

  /**
   * Set the vlaues for r, g, b, and a.
   * @param {number} r Red [0 - 255]
   * @param {number} g Green [0 - 255]
   * @param {number} b Blue [0 - 255] 
   * @param {number} a Alpha [0 - 1]
   */
  set(r, g, b, a) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
    this._updateString();
  }

  /**
   * Updates the color string.
   * @private
   */
  _updateString() {
    this.string = `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }
}

/**
 * Default colors. Example:
 * ```js
 * const color = Colors.crimson();
 * ```
 */
export const Colors = {
  black:      () => new Color(0, 0, 0, 1),
  blue:       () => new Color(0, 0, 255, 1),
  crimson:    () => new Color(220, 20, 60, 1),
  cyan:       () => new Color(0, 255, 255, 1),
  darkBlue:   () => new Color(0, 0, 139, 1),
  darkGray:   () => new Color(80, 80, 80, 1),
  darkGreen:  () => new Color(0, 100, 0, 1),
  darkRed:    () => new Color(139, 0, 0, 1),
  deepPink:   () => new Color(255, 20, 147, 1),
  dodgerBlue: () => new Color(30, 144, 255, 1),
  gold:       () => new Color(255, 215, 0, 1),
  gray:       () => new Color(128, 128, 128, 1),
  green:      () => new Color(0, 128, 0, 1),
  indianRed:  () => new Color(205, 92, 92, 1),
  lightBlue:  () => new Color(173, 216, 230, 1),
  lightGray:  () => new Color(211, 211, 211, 1),
  lightGreen: () => new Color(144, 238, 144, 1),
  lightPink:  () => new Color(255, 182, 193, 1),
  lime:       () => new Color(0, 255, 0, 1),
  magenta:    () => new Color(255, 0, 255, 1),
  orange:     () => new Color(255, 165, 0, 1),
  pink:       () => new Color(255, 192, 203, 1),
  purple:     () => new Color(128, 0, 128, 1),
  red:        () => new Color(255, 0, 0, 1),
  white:      () => new Color(255, 255, 255, 1),
  yellow:     () => new Color(255, 255, 0, 1),
}
