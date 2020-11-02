import { Graphic } from './Graphic.js';
import { Color } from './Color.js';
import { Border } from './Border.js';
import { Transform } from '../Geom/Transform.js';
import { TWO_PI } from '../Utils/MathUtils.js';

export class CircleShape extends Graphic {
  /**
   * Creates a new circle shape graphics object.
   * @param {number} radius 
   * @param {Color} color 
   */
  constructor(radius, color) {
    super();

    /** @type {number} */
    this.radius = radius;

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
    // No need to rotate circle..
    context.translate(transform.position.x, transform.position.y);
    context.scale(transform.scale.x, transform.scale.y);

    // Set path.
    context.beginPath();
    context.arc(0, 0, this.radius, 0, TWO_PI);
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