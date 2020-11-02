import { Canvas } from "./Canvas.js"; 
import { Scene } from './Scene.js';
import { Input } from "./Input.js";

export class EasyGameEngine {
  /**
   * Creates a new Game object that manages scenes.
   * @param {number} width Width of the game canvas.
   * @param {number} height Height of the game canvas.
   */
  constructor(width, height) {
    /** @type {Canvas} */
    this.canvas = new Canvas(width, height);

    /** 
     * Input to check keyboard and mouse state.
     * @type {Input} 
     */
    this.input = new Input();

    /**
     * The maximum allowed deltaTime incase of lag spikes. 
     * @type {number} 
     */
    this.maxDeltaTime = 0.1;

    /** 
     * Active scene of the game.
     * @type {Scene}
     * @private
     */
    this._scene = null;

    /**
     * Used to calculate frame deltaTime. **Don't touch this!** 
     * @type {number} 
     * @private
     */
    this._previousTime = 0;

    // We need to bind this to the _gameLoop function because
    // the reference to this is lost when using requestAnimationFrame.
    this._gameLoop = this._gameLoop.bind(this);

    // Start the game loop.
    requestAnimationFrame(this._gameLoop);
  }

  /**
   * Active scene of the game.
   * @type {Scene}
   */
  get scene() {
    return this._scene;
  }

  /**
   * Change scene.
   * @param {Scene} scene 
   */
  changeScene(scene) {
    if(scene.game !== null) {
      throw new Error("The given scene has already been added to a Game.");
    }
    // End currently active scene.
    if(this._scene) {
      this._scene.end();
      this._scene.game = null;
    }
    // Set and start the new active scene.
    this._scene = scene;
    this._scene.game = this;
    this._scene.start();
  }

  /**
   * Main loop of the game. **Don't call this!**
   * @param {number} elapsedTime Elapsed time since the game was started.
   * @private
   */
  _gameLoop(elapsedTime) {
    // Request next frame.
    requestAnimationFrame(this._gameLoop);

    // Calculate frame delta time.
    const deltaTime = Math.min((elapsedTime - this._previousTime) / 1000.0, this.maxDeltaTime);
    this._previousTime = elapsedTime;

    // Update input.
    this.input.update();

    // Clear canvas between renders.
    this.canvas.clear();

    // Update and render scene.
    if(this._scene) {
      this._scene.update(deltaTime, elapsedTime / 1000.0);
      this._scene.render(this.canvas.context);
    }
  }
}