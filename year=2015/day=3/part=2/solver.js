import { hashLocation } from "../locationHasher.js";
import { parseMove } from "../moveParser.js";
import { cycleIterable } from "../../../iterables/cycler.js";

export function solve(
  /** @type {string} */ input,
  /** @type {[number, number]} */ origin = [0, 0]
) {
  const locationHasheSet = new Set([hashLocation(origin)]);
  const santas = Array.from({ length: 2 }, () => ({ location: origin }));
  const nextSanta = takeTurns(santas);
  for (const char of input) {
    const move = parseMove(char);
    const santa = nextSanta();
    santa.location = move(santa.location);
    locationHasheSet.add(hashLocation(santa.location));
  }
  return locationHasheSet.size;
}

/** @template T */
function takeTurns(/** @type {Iterable<T>} */ iterable) {
  const iterator = cycleIterable(iterable)[Symbol.iterator]();
  return () => iterator.next().value;
}
