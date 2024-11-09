type Operator = "+" | "-" | "*" | "/";
type NumberJob = number;
type OperationJob = { a: string; operator: Operator; b: string };
type Job = NumberJob | OperationJob;

export default function solve(input: string) {
  const monkeyToJob = input.matchAll(
    /^(?<monkey>.+): (?:(?<number>\d+)|(?<a>.+?) (?<operator>[+\-*/]) (?<b>.+?))$/gm,
  ).reduce(
    (map, { groups: { monkey, number, a, operator, b } = {} }) =>
      map.set(monkey, number ? +number : <Job> { a, operator, b }),
    new Map<string, Job>(),
  );
  function buildExpr(monkey: string): string {
    const job = monkeyToJob.get(monkey);
    if (job === undefined) throw new Error(`monkey ${monkey} not found`);
    if (typeof job === "number") return `${job}`;
    return `(${buildExpr(job.a)}) ${job.operator} (${buildExpr(job.b)})`;
  }
  const expression = buildExpr("root");
  return eval(expression);
}
