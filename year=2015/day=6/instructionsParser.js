/** @typedef {{ name: "turn on" | "turn off" | "toggle"; clientRect: ClientRect }} Instruction */

/**
 * @param {string} input
 * @returns {Generator<Instruction>}
 */
export function* parseInstructions(input) {
  for (const [, name, left, top, right, bottom] of input.matchAll(
    /(?<name>turn on|turn off|toggle) (?<left>\d+),(?<top>\d+) through (?<right>\d+),(?<bottom>\d+)/g
  )) {
    yield {
      name: /** @type {"turn on" | "turn off" | "toggle"} */ (name),
      clientRect: {
        left: Number(left),
        top: Number(top),
        right: Number(right),
        bottom: Number(bottom),
        get width() {
          return this.right - this.left + 1;
        },
        get height() {
          return this.bottom - this.top + 1;
        },
      },
    };
  }
}
