function hash(text: string) {
  let result = 0;
  for (const char of text) {
    result += char.charCodeAt(0);
    result *= 17;
    result %= 256;
  }
  return result;
}

export default function solve(input: string) {
  const boxes = Array.from({ length: 256 }, () => new Map<string, number>());
  for (const step of input.split(",")) {
    if (step.endsWith("-")) {
      const label = step.slice(0, -1);
      boxes[hash(label)].delete(label);
      continue;
    }
    const [label, focalLengthText] = step.split("=");
    const focalLength = Number(focalLengthText);
    boxes[hash(label)].set(label, focalLength);
  }
  return boxes.flatMap((box, boxIndex) =>
    Array.from(
      box.values(),
      (focalLength, slotIndex) =>
        (boxIndex + 1) * (slotIndex + 1) * focalLength,
    )
  ).reduce((sum, value) => sum + value, 0);
}
