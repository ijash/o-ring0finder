/**
 * Retrieves the width of an HTML element.
 *
 * @param {string} elementId - The ID of the element.
 * @param {boolean} [full=false] - Include padding and borders.
 * @returns {number} Element width.
 */
export function getElementWidth(elementId: string, full = false): number {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error(`Element '#${elementId}' not found.`);
  }

  return full ? element.offsetWidth : element.clientWidth;
}
