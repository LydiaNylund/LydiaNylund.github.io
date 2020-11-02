import { Transform } from "../Geom/Transform.js";

/** @abstract */
export class Graphic {
  /**
   * Render the graphic onto the canvas.
   * @param {Transform} transform
   * @param {CanvasRenderingContext2D} context 
   * @abstract
   */
  render(transform, context) {
    throw new Error('Must be implemented by subclass!');
  }
}