import * as SNAFU from "../../snafu.ts";

export default function solve(input: string) {
  return SNAFU.stringify(
    input.split("\n").map(SNAFU.parse).reduce((sum, value) => sum + value, 0),
  );
}
