import { Color, Colors } from "./Color.js";

export class Border {
  /**
   * Border
   * @param {number} width 
   * @param {Color} color 
   */
  constructor(width=1, color=Colors.black()) {
    /** @type {number} */
    this.width = width;

    /** @type {Color} */
    this.color = color;
  }
}