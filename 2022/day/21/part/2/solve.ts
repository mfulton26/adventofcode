import nerdamer from "nerdamer";
import "nerdamer/Solve.js";

type Operator = "+" | "-" | "*" | "/" | "=";
type NumberJob = number;
type OperationJob = { a: string; operator: Operator; b: string };
type VariableJob = string;
type Job = NumberJob | OperationJob | VariableJob;

export default function solve(input: string) {
  const monkeyToJob = input.matchAll(
    /^(?<monkey>.+): (?:(?<number>\d+)|(?<a>.+?) (?<operator>[+\-*/]) (?<b>.+?))$/gm,
  ).reduce(
    (map, { groups: { monkey, number, a, operator, b } = {} }) =>
      map.set(monkey, number ? +number : <Job> { a, operator, b }),
    new Map<string, Job>(),
  );
  (monkeyToJob.get("root") as OperationJob).operator = "=";
  monkeyToJob.set("humn", "x");
  function buildExpr(monkey: string): string {
    const job = monkeyToJob.get(monkey);
    if (job === undefined) throw new Error(`monkey ${monkey} not found`);
    if (typeof job !== "object") return `${job}`;
    return `(${buildExpr(job.a)}) ${job.operator} (${buildExpr(job.b)})`;
  }
  const expression = buildExpr("root");
  return Number(nerdamer(expression).solveFor("x"));
}
