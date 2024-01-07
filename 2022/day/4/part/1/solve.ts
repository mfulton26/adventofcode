import { parseAssignmentPairs } from "../../assignmentPairs.ts";

export default function solve(input: string) {
  let count = 0;
  for (const { first, second } of parseAssignmentPairs(input)) {
    if (
      (first.lower <= second.lower && first.upper >= second.upper) ||
      (second.lower <= first.lower && second.upper >= first.upper)
    ) {
      count++;
    }
  }
  return count;
}
