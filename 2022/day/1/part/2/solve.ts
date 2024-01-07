import lines from "dnx/String/lines.ts";
import split from "dnx/Array/split.ts";
import map from "dnx/Array/map.ts";
import sumBy from "dnx/Array/sumBy.ts";
import sortDescending from "dnx/Array/sortDescending.ts";
import slice from "dnx/Array/slice.ts";
import sum from "dnx/Array/sum.ts";

export default function solve(input: string) {
  return input[lines]()
    [split]("")
    [map]((paragraphLines) => paragraphLines[sumBy](Number))
    [sortDescending]()
    [slice](0, 3)
    [sum]();
}
