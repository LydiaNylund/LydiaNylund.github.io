import { Graphic } from './Graphic.js';
import { Color } from './Color.js';
import { Border } from './Border.js';
import { Transform } from '../Geom/Transform.js';
import { Vector2d } from '../Geom/Vector2d.js';

export class BoxShape extends Graphic {
  /**
   * Creates a new box shape graphics object.
   * @param {number} width 
   * @param {number} height 
   * @param {Color} color 
   */
  constructor(width, height, color) {
    super();

    /** @type {Vector2d} */
    this.size = new Vector2d(width, height);

    /** @type {Color} */
    this.color = color;

    /** @type {Border} */
    this.border = new Border();

    /** @type {boolean} */
    this.useFill = true;

    /** @type {boolean} */
    this.useBorder = false;
  }

  /**
   * Sets the border.
   * @param {number} width 
   * @param {Color} color 
   * @param {boolean} useBorder 
   */
  setBorder(width, color, useBorder = true) {
    this.border.width = width;
    this.border.color = color;
    this.useBorder = useBorder;
  }

  /**
   * Render the shape onto the canvas.
   * @param {Transform} transform
   * @param {CanvasRenderingContext2D} context 
   * @abstract
   */
  render(transform, context) {
    context.save();
    context.rotate(transform.rotate);
    context.translate(transform.position.x, transform.position.y);
    context.scale(transform.scale.x, transform.scale.y);

    // Set path.
    context.beginPath();
    context.rect(-this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
    context.closePath();

    // Fill if needed.
    if(this.useFill && this.color.a > 0) {
      context.fillStyle = this.color.string;
      context.fill();
    }

    // Stroke if needed.
    if(this.useBorder && this.border.color.a > 0) {
      context.strokeStyle = this.border.color.string;
      context.lineWidth = this.border.width;
      context.stroke();
    }

    context.restore();
  }
}