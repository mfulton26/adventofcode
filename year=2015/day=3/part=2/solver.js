import { hashLocation } from "../locationHasher.js";
import { parseMove } from "../moveParser.js";
import { cycle } from "../../../iterables/cycler.js";

/**
 * @param {string} input
 * @param {[number, number]} [origin]
 * @returns {number}
 */
export function solve(input, origin = [0, 0]) {
  const locationHashSet = new Set([hashLocation(origin)]);
  const santas = Array.from({ length: 2 }, () => ({ location: origin }));
  const nextSanta = takeTurns(santas);
  for (const char of input) {
    const move = parseMove(char);
    const santa = nextSanta();
    santa.location = move(santa.location);
    locationHashSet.add(hashLocation(santa.location));
  }
  return locationHashSet.size;
}

/**
 * @param {Iterable<T>} iterable
 * @returns {() => T}
 * @template T
 */
function takeTurns(iterable) {
  const iterator = cycle(iterable)[Symbol.iterator]();
  return () => iterator.next().value;
}
