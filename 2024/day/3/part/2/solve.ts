export default function solve(input: string) {
  let sum = 0;
  let enabled = true;
  const regExp =
    // todo: remove lint-ignore once https://github.com/denoland/deno_lint/issues/1372 is fixed
    // deno-lint-ignore no-invalid-regexp
    /(?<op>do)\(\)|(?<op>don't)\(\)|(?<op>mul)\((?<a>\d+),(?<b>\d+)\)/g;
  for (const { groups } of input.matchAll(regExp)) {
    const { op, a, b } = groups!;
    if (op === "mul") { if (enabled) sum += +a * +b; }
    else enabled = op === "do";
  }
  return sum;
}
