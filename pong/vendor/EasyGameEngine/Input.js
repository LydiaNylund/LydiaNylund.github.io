export class Input {
  constructor() {
    /** 
     * Holds the current state of keys and mouse buttons.
     * @type {Set<number>}
     * @private
     */
    this._state = new Set();
    /** 
     * Holds the previous state of keys and mouse buttons.
     * @type {Set<number>}
     * @private
     */
    this._previousState = new Set();
    /** 
     * Holds which keys or moouse buttons should be added into _state.
     * @type {Set<number>}
     * @private
     */
    this._toAdd = new Set();
    /** 
     * Holds which keys or moouse buttons should be removed from _state.
     * @type {Set<number>}
     * @private
     */
    this._toRemove = new Set();

    // Bind this to event functions because it might not be available
    // when the event is called.
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);

    // Add event listeners.
    addEventListener('keydown', this._onKeyDown);
    addEventListener('keyup', this._onKeyUp);
  }

  /**
   * Returns true if the given key is pressed.
   * @param {number} keyCode
   * @returns {boolean} 
   */
  getKey(keyCode) {
    return this._state.has(keyCode);
  }

  /**
   * Returns true if the given key was pressed this frame.
   * @param {number} keyCode
   * @returns {boolean} 
   */
  getKeyDown(keyCode) {
    return this._state.has(keyCode) && !this._previousState.has(keyCode);
  }

  /**
   * Returns true if the given key was released this frame.
   * @param {number} keyCode
   * @returns {boolean} 
   */
  getKeyUp(keyCode) {
    return !this._state.has(keyCode) && this._previousState.has(keyCode);
  }

  /**
   * Update state. Should be called once every frame.
   */
  update() {
    // Copy _state into _previousState.
    // We need to know the previous state of which keys or mouse buttons was pressed
    // so we know what keys or mouse buttons was pressed or released this frame.
    this._previousState.clear();
    for(let key of this._state) {
      this._previousState.add(key);
    }

    // Remove from _state.
    for(let key of this._toRemove) {
      // Don't remove key if it somehow was pressed and released on the same frame.
      // In that case we give priority to add and then remove in the next frame.
      if(!this._toAdd.has(key)) {
        this._state.delete(key);
        this._toRemove.delete(key);
      }
    }

    // Add to _state.
    for(let key of this._toAdd) {
      this._state.add(key);
    }
    this._toAdd.clear();
  }

  /**
   * Capture on key down events.
   * @param {KeyboardEvent} e 
   * @private
   */
  _onKeyDown(e) {
    this._toAdd.add(e.keyCode);
  }

  /**
   * Capture on key up events.
   * @param {KeyboardEvent} e 
   * @private
   */
  _onKeyUp(e) {
    this._toRemove.add(e.keyCode);
  }
}

/**
 * Enum that holds key codes.
 */
export const KeyCodes = {
  tab: 9,
  return: 13,
  shift: 16,
  control: 17,
  alt: 18,
  space: 32,
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  digit0: 48,
  digit1: 49,
  digit2: 50,
  digit3: 51,
  digit4: 52,
  digit5: 53,
  digit6: 54,
  digit7: 55,
  digit8: 56,
  digit9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
}