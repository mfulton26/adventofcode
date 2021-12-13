import count from "../../../lib/count.js";
import sum from "../../../lib/sum.js";

export function solve(input) {
  return input
    .split("\n")
    .map((line) =>
      line
        .split(" | ")[1]
        .split(" ")
        [count]((word) => [2, 3, 4, 7].includes(word.length))
    )
    [sum]();
}
