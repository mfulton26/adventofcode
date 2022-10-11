import { unreachable } from "std/testing/asserts.ts";

export default function solve(
  input: string,
  { size = { width: 25, height: 6 } } = {},
) {
  const layers = parseLayers(input, size);
  const image = createImageFromLayers(layers, size);
  return image.map((row) => row.join("")).join("\n");
}

function parseLayers(
  input: string,
  { width, height }: { width: number; height: number },
) {
  const layerRegExp = new RegExp(`.{${width * height}}`, "g");
  const rowRegExp = new RegExp(`.{${width}}`, "g");
  return input.match(layerRegExp)!.map((layer) =>
    layer.match(rowRegExp)!.map((row) => Array.from(row).map(Number))
  );
}

function createImageFromLayers(
  layers: number[][][],
  { width, height }: { width: number; height: number },
) {
  return Array.from(
    { length: height },
    (_, r) =>
      Array.from({ length: width }, (_, c) => {
        for (const layer of layers) {
          const pixel = layer[r][c];
          if (pixel === 2) continue;
          return pixel;
        }
        unreachable();
      }),
  );
}
