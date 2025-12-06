import operations from "../../operations.ts";

function* parseProblems(text: string) {
  const lines = text.split("\n");
  let operands: number[] = [];
  for (let c = lines[0].length - 1; c >= 0; c--) {
    const value = lines.slice(0, -1).map((line) => line[c].trim()).join("");
    if (!value) continue;
    operands.push(+value);
    const operator = lines[lines.length - 1][c] as " " | "+" | "*";
    if (operator === " ") continue;
    yield { operator, operands };
    operands = [];
  }
}

export default function solve(input: string) {
  return parseProblems(input)
    .map(({ operator, operands }) => operations[operator](operands))
    .reduce((sum, value) => sum + value, 0);
}
