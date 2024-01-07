import lines from "dnx/String/lines.ts";
import split from "dnx/Array/split.ts";
import map from "dnx/Array/map.ts";
import sumBy from "dnx/Array/sumBy.ts";
import max from "dnx/Array/max.ts";

export default function solve(input: string) {
  return input[lines]()
    [split]("")
    [map]((paragraphLines) => paragraphLines[sumBy](Number))
    [max]()!;
}
