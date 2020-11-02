export class Canvas {
  /**
   * Creates a new canvas with the given width and height in pixels.
   * @param {number} width 
   * @param {number} height 
   */
  constructor(width, height) {
    /** @type {HTMLCanvasElement} */
    this.element = document.createElement('canvas');
    this.element.classList.add('game-canvas');

    /** @type {CanvasRenderingContext2D} */
    this.context = this.element.getContext('2d');

    // width, height and dpi will be initialized in setSize.
    
    /**
     * Pixel width of the canvas.
     * ```js
     * // Use setSize if you want to change the size.
     * scene.setSize(width, height);
     * ```
     * @type {number} 
     */
    this.width;
    
    /**
     * Pixel height of the canvas.
     * ```js
     * // Use setSize if you want to change the size.
     * scene.setSize(width, height);
     * ```
     * @type {number} 
     */
    this.height;
    
    /** 
     * DPI of the screen.
     * @type {number} 
     */
    this.dpi;

    // Initialize size of the canvas.
    this.setSize(width, height);
  }

  /**
   * Set the size of the canvas.
   * @param {number} width Width of the canvas in pixels.
   * @param {number} height Height of the canvas in pixels.
   */
  setSize(width, height) {
    // Store state.
    this.dpi = window.devicePixelRatio || 1;
    this.width = width;
    this.height = height;

    // Set canvas size.
    this.element.width = width * this.dpi;
    this.element.height = height * this.dpi;

    // Scale canvas to the correct size for screens with high dpi.
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;

    // Scale the context to match dpi.
    this.context.setTransform(this.dpi, 0, 0, this.dpi, 0, 0);
  }

  /**
   * Clears the canvas.
   */
  clear() {
    this.context.clearRect(0, 0, this.element.clientWidth, this.element.clientHeight);
  }
}