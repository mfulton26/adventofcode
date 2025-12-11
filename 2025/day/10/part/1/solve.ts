import subsets from "@lib/subsets.ts";

export default function solve(input: string) {
  const lines = input.split("\n").map((line) => {
    const [lightsText, ...rest] = line.split(" ");
    const lights = +`0b${
      Array.from(lightsText.slice(1, -1), (c) => (c === "#" ? "1" : "0"))
        .reverse().join("")
    }`;
    const buttons = rest.slice(0, -1)
      .map((text) =>
        text.slice(1, -1).split(",").map(Number)
          .reduce((sum, n) => sum + 2 ** n, 0)
      );
    const requirements = rest.at(-1)!.slice(1, -1).split(",").map(Number);
    return { lights, buttons, requirements };
  });
  let sum = 0;
  for (const { lights, buttons } of lines) {
    let min = Infinity;
    for (const presses of subsets(new Set(buttons))) {
      if (presses.size >= min) continue;
      let actual = 0;
      for (const press of presses) actual ^= press;
      if (actual !== lights) continue;
      min = presses.size;
    }
    sum += min;
  }
  return sum;
}
