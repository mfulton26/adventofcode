export default function solve(
  input: string,
  { size = { width: 25, height: 6 } } = {},
) {
  const layers = parseLayers(input, size);
  const [digitCounts] = layers
    .map(layerToDigitCounts)
    .sort(([a], [b]) => a - b);
  return (digitCounts[1] * digitCounts[2]);
}

function parseLayers(
  input: string,
  { width, height }: { width: number; height: number },
) {
  return input.match(new RegExp(`.{${width * height}}`, "g"))!
    .map((layer) => Array.from(layer, Number));
}

function layerToDigitCounts(layer: number[]) {
  return layer.reduce(
    (digitCounts, digit) => (digitCounts[digit]++, digitCounts),
    Array.from({ length: 10 }, () => 0),
  );
}
