export const TWO_PI = Math.PI * 2;

/**
 * Generates a random integer between min *(inclusive)* and max *(inclusive)*.
 * @param {number} min 
 * @param {number} max 
 */
export function randomInt(min, max) {
  return Math.round(randomFloat(min, max));
}

/**
 * Generates a random floating point number between min *(inclusive)* and max *(exclusive)*.
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}