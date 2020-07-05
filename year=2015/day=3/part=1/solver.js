import { hashLocation } from "../locationHasher.js";
import { parseMove } from "../moveParser.js";

/**
 * @param {string} input
 * @param {[number, number]} [origin]
 * @returns {number}
 */
export function solve(input, origin = [0, 0]) {
  const locationHasheSet = new Set([hashLocation(origin)]);
  const santa = { location: origin };
  for (const char of input) {
    const move = parseMove(char);
    santa.location = move(santa.location);
    locationHasheSet.add(hashLocation(santa.location));
  }
  return locationHasheSet.size;
}
