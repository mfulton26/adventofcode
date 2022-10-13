export default function solve(input: string) {
  const lights = Array.from(
    { length: 1_000 },
    () => Array.from({ length: 1_000 }, () => false),
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
    (count, row) => count + row.reduce((count, light) => count + +light, 0),
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

const followInstruction: Record<string, (light: boolean) => boolean> = {
  "turn on": () => true,
  "turn off": () => false,
  "toggle": (light) => !light,
};
