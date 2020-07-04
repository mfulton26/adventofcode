import { split } from "./splitter.js";

export default function lineSplitter() {
  return splitLines;
}

export function* splitLines(/** @type {string} */ string) {
  yield* split(string, eolRegExp);
}

const eolRegExp = /\n\r?/gm;
