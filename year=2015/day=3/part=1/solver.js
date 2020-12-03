import { hashLocation } from "../locationHasher.js";
import { parseMove } from "../moveParser.js";

/**
 * @param {string} input
 * @param {[number, number]} [origin]
 * @returns {number}
 */
export function solve(input, origin = [0, 0]) {
  const locationHashSet = new Set([hashLocation(origin)]);
  const santa = { location: origin };
  for (const char of input) {
    const move = parseMove(char);
    santa.location = move(santa.location);
    locationHashSet.add(hashLocation(santa.location));
  }
  return locationHashSet.size;
}
