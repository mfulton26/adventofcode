import Signals from "./Signals";

/**
 * @param {string} input
 * @returns {Map<string, (signals: Signals) => number>}
 */
export function parseConnections(input) {
  return new Map(parseConnectionEntries(input));
}

/**
 * @param {string} input
 * @returns {Generator<[string, (signals: Signals) => number], void, void>}
 */
function* parseConnectionEntries(input) {
  for (const line of input.split("\n")) {
    yield parseConnectionEntry(line);
  }
}

/**
 * @param {string} line
 */
function parseConnectionEntry(line) {
  const words = line.split(" ");
  if (words[0] === "NOT") {
    return parseNot(words);
  } else {
    switch (words[1]) {
      case "AND":
        return parseAnd(words);
      case "OR":
        return parseOr(words);
      case "LSHIFT":
        return parseLeftShift(words);
      case "RSHIFT":
        return parseRightShift(words);
      default:
        return parseSource(words);
    }
  }
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseSource([source, , destination]) {
  return [destination, (signals) => signals.get(source)];
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseAnd([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) & signals.get(b)];
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseOr([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) | signals.get(b)];
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseLeftShift([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) << signals.get(b)];
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseRightShift([a, , b, , destination]) {
  return [destination, (signals) => signals.get(a) >>> signals.get(b)];
}

/**
 * @param {string[]} words
 * @returns {[string, (signals: Signals) => number]}
 */
function parseNot([, source, , destination]) {
  return [destination, (signals) => ~signals.get(source) & 0xffff];
}
