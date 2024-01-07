import { parseAssignmentPairs } from "../../assignmentPairs.ts";

export default function solve(input: string) {
  let count = 0;
  for (const { first, second } of parseAssignmentPairs(input)) {
    if (
      (first.upper >= second.lower && first.lower <= second.upper) ||
      (second.upper >= first.lower && second.lower <= first.upper)
    ) {
      count++;
    }
  }
  return count;
}
