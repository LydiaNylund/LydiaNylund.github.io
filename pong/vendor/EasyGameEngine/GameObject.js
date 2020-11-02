import { Transform } from './Geom/Transform.js';
import { Vector2d } from './Geom/Vector2d.js';
import { Graphic } from './Graphics/Graphic.js';
import { Scene } from './Scene.js';
import { Input } from './Input.js';

export class GameObject {
  /**
   * Creates a new GameObject instance. It might be a good idea to create subclasses of GameObject.
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    /** @type {Transform} */
    this.transform = new Transform(new Vector2d(x, y));
    
    /** @type {Graphic} */
    this.graphic = null;

    /**
     * The Scene this GameObject belongs to. Will be set when using:
     * ```js
     * scene.add(gameObject);
     * ``` 
     * @type {Scene} 
     */
    this.scene = null;
  }

  /**
   * Input to check keyboard and mouse state.
   * ```js
   * // Shorthand for:
   * this.scene.game.input
   * ```
   * @returns {Input}
   */
  get input() {
    return this.scene.game.input;
  }

  /**
   * Called once when added to a scene.
   * @virtual
   */
  start() { }

  /**
   * Called once when removed from a scene.
   * @virtual
   */
  end() { }
  
  /**
   * @param {number} deltaTime 
   * @param {number} elapsedTime 
   * @virtual
   */
  update(deltaTime, elapsedTime) { }

  /** @param {CanvasRenderingContext2D} context */
  render(context) {
    if(this.graphic) {
      this.graphic.render(this.transform, context);
    }
  }
}