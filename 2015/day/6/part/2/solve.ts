export default function solve(input: string) {
  const lights = Array.from(
    { length: 1_000 },
    () => Array.from({ length: 1_000 }, () => 0),
  );
  for (const { name, left, top, right, bottom } of parseInstructions(input)) {
    for (let rowIndex = top; rowIndex <= bottom; rowIndex++) {
      const row = lights[rowIndex];
      for (let columnIndex = left; columnIndex <= right; columnIndex++) {
        row[columnIndex] = followInstruction[name](row[columnIndex]);
      }
    }
  }
  return lights.reduce(
    (sum, row) => sum + row.reduce((sum, light) => sum + light, 0),
    0,
  );
}

function* parseInstructions(text: string) {
  for (
    const [, name, left, top, right, bottom] of text.matchAll(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/g,
    )
  ) {
    yield {
      name,
      left: Number(left),
      top: Number(top),
      right: Number(right),
      bottom: Number(bottom),
    };
  }
}

const followInstruction: Record<string, (light: number) => number> = {
  "turn on": (light) => light + 1,
  "turn off": (light) => Math.max(light - 1, 0),
  toggle: (light) => light + 2,
};
