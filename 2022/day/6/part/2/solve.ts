const regExp = new RegExp(
  Array.from({ length: 14 }, (_, k) => `(?!\\${k + 1})`)
    .map((_, end, patterns) => `(${patterns.slice(0, end).join("")}.)`)
    .join(""),
);

export default function solve(input: string) {
  const { index, 0: { length } } = regExp.exec(input)!;
  return index + length;
}
