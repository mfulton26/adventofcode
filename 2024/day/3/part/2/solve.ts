export default function solve(input: string) {
  let sum = 0;
  let enabled = true;
  const regExp =
    /(?<op>do)\(\)|(?<op>don't)\(\)|(?<op>mul)\((?<a>\d+),(?<b>\d+)\)/g;
  for (const { groups } of input.matchAll(regExp)) {
    const { op, a, b } = groups!;
    if (op === "mul") { if (enabled) sum += +a * +b; }
    else enabled = op === "do";
  }
  return sum;
}
