import { parseDirection } from "../directionParser.js";

/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  return (
    1 +
    Array.from(input)
      .map(parseDirection)
      .findIndex(
        function (direction) {
          this.floor = direction(this.floor);
          return this.floor < 0;
        }.bind({ floor: 0 })
      )
  );

  // let position = 0;
  // let floor = 0;
  // for (const char of input) {
  //   ++position;
  //   const direction = parseDirection(char);
  //   floor = direction(floor);
  //   if (floor < 0) {
  //     return position;
  //   }
  // }
  // throw new Error("position not found");
}
