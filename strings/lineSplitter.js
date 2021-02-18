import { split } from "./splitter.js";

/**
 * @returns {(string: string) => Generator<string>}
 */
export default function lineSplitter() {
  return splitLines;
}

/**
 * @param {string} string
 * @returns {Generator<string>}
 */
export function* splitLines(string) {
  yield* split(string, eolRegExp);
}

const eolRegExp = /\n\r?/gm;
