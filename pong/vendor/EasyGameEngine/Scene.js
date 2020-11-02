import { EasyGameEngine } from './EasyGameEngine.js';
import { GameObject } from './GameObject.js';
import { Input } from './Input.js'

/** @abstract */
export class Scene {
  /**
   * Scene should not be created with **new**. You should create a subclass that extends Scene.
   */
  constructor() {
    /** 
     * The game object this scene belongs to. Will be set before `this.begin()`. The value is null in the constructor.
     * @type {EasyGameEngine}
     */
    this.game = null;

    /**
     * Array for holding GameObject children.
     * @type {gameObject[]}
     */
    this.children = [];

    /**
     * GameObjects to be added.
     * @type {Array<GameObject>}
     * @private
     */
    this._addList = [];

    /**
     * GameObjects to be removed.
     * @type {Array<GameObject>}
     * @private
     */
    this._removeList = [];
  }

  /**
   * Input to check keyboard and mouse state.
   * ```js
   * // Shorthand for:
   * this.game.input
   * ```
   * @returns {Input}
   */
  get input() {
    return this.game.input;
  }

  /**
   * Pixel width of the game canvas.
   * ```js
   * // Shorthand for:
   * this.game.canvas.width
   * ```
   * @returns {number}
   */
  get width() {
    return this.game.canvas.width;
  }

  /**
   * Pixel height of the game canvas.
   * ```js
   * // Shorthand for:
   * this.game.canvas.height
   * ```
   * @returns {number}
   */
  get height() {
    return this.game.canvas.height;
  }

  /**
   * Adds a GameObject to the scene.
   * @param {GameObject} child 
   */
  add(child) {
    if(child.scene !== null) {
      throw new Error("The child has already been added to a scene.");
    }
    // It's not good to add children directly into the children array
    // because children may be added in the update loop and will then mess
    // with the children array length.
    this._addList.push(child);
    return child;
  }

  /**
   * Removes a GameObject from the scene.
   * @param {GameObject} child 
   */
  remove(child) {
    if(child.scene !== this) {
      throw new Error("The child does not belong to this scene.");
    }
    // It's not good to remove children directly from the children array
    // because children may be removed in the update loop and will then mess
    // with the children array length.
    this._removeList(child);
    return child;
  }

  /**
   * Called once when the scene is added to the game.
   * @virtual
   */
  start() { }

  /**
   * Called when the scene is removed from the game.
   * @virtual
   */
  end() { }

  /**
   * Used for game logic.
   * @param {number} deltaTime Time in seconds since last frame.
   * @param {number} elapsedTime Elapsed time since the game was started.
   */
  update(deltaTime, elapsedTime) {
    // Update children.
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].update(deltaTime, elapsedTime);
    }

    let child;

    // Add children.
    while(this._addList.length > 0) {
      child = this._addList.shift();
      this.children.push(child);
      child.scene = this;
      child.start();
    }

    // Remove children.
    while(this._removeList.length > 0) {
      child = this._removeList.shift();
      this.children.splice(this.children.indexOf(child), 1)[0];
      child.end();
      child.scene = null;
    }
  }

  /**
   * Used for rendering the scene.
   * @param {CanvasRenderingContext2D} context 
   */
  render(context) {
    // Render children.
    for(let i = 0; i < this.children.length; i++) {
      this.children[i].render(context);
    }
  }
}