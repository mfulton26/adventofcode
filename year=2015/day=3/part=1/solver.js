import { hashLocation } from "../locationHasher.js";
import { parseMove } from "../moveParser.js";

export function solve(
  /** @type {string} */ input,
  /** @type {[number, number]} */ origin = [0, 0]
) {
  const locationHasheSet = new Set([hashLocation(origin)]);
  const santa = { location: origin };
  for (const char of input) {
    const move = parseMove(char);
    santa.location = move(santa.location);
    locationHasheSet.add(hashLocation(santa.location));
  }
  return locationHasheSet.size;
}
