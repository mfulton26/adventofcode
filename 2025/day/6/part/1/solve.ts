import operations from "../../operations.ts";

function* parseProblems(text: string) {
  const data = text.split("\n")
    .map((line) => line.trim().split(/\s+/).map((word) => word.trim()));
  for (let c = 0; c < data[0].length; c++) {
    const operands = data.slice(0, -1).map((row) => +(row[c]));
    const operator = data[data.length - 1][c] as "+" | "*";
    yield { operator, operands };
  }
}

export default function solve(input: string) {
  return parseProblems(input)
    .map(({ operator, operands }) => operations[operator](operands))
    .reduce((sum, value) => sum + value, 0);
}
