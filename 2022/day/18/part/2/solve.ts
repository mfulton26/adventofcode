// cspell:words voxel voxels

type Vector = { x: number; y: number; z: number };

const directions: Vector[] = [
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
];

const Positions = {
  parse: (text: string) =>
    text.split("\n").map((line) => {
      const [x, y, z] = line.split(",").map(Number);
      return { x, y, z } as Vector;
    }),
  findLimits: (positions: Vector[]) =>
    positions.reduce(
      ({ min, max }, { x, y, z }) => ({
        min: {
          x: Math.min(x, min.x),
          y: Math.min(y, min.y),
          z: Math.min(z, min.z),
        },
        max: {
          x: Math.max(x, max.x),
          y: Math.max(y, max.y),
          z: Math.max(z, max.z),
        },
      }),
      {
        min: { x: Infinity, y: Infinity, z: Infinity } as Vector,
        max: { x: -Infinity, y: -Infinity, z: -Infinity } as Vector,
      },
    ),
  toVoxels: (positions: Vector[], { buffer = 1 } = {}) => {
    const { min, max } = Positions.findLimits(positions);
    const width = max.x - min.x + 1 + 2 * buffer;
    const height = max.y - min.y + 1 + 2 * buffer;
    const depth = max.z - min.z + 1 + 2 * buffer;
    const A = <T>(length: number, fn: () => T) => Array.from({ length }, fn);
    const result = A(depth, () => A(height, () => A(width, () => false)));
    for (const { x, y, z } of positions) {
      result[z - min.z + buffer][y - min.y + buffer][x - min.x + buffer] = true;
    }
    return result;
  },
};

const Voxels = {
  clone: (voxels: boolean[][][]) =>
    voxels.map((plane) => plane.map((row) => row.slice())),
  toFlooded: (voxels: boolean[][][], start: Vector) => {
    const result = Voxels.clone(voxels);
    const { length: depth, 0: { length: height, 0: { length: width } } } =
      voxels;
    const stack = [start];
    while (stack.length) {
      const { x, y, z } = stack.pop()!;
      if (
        x < 0 || x >= width ||
        y < 0 || y >= height ||
        z < 0 || z >= depth ||
        result[z][y][x]
      ) continue;
      result[z][y][x] = true;
      for (const d of directions) {
        stack.push({ x: x + d.x, y: y + d.y, z: z + d.z });
      }
    }
    return result;
  },
  xor: (a: boolean[][][], b: boolean[][][]) =>
    a.map((plane, z) =>
      plane.map((row, y) =>
        row.map(
          (voxel, x) => voxel !== b[z][y][x],
        )
      )
    ),
  inv: (voxels: boolean[][][]) =>
    voxels.map((plane) => plane.map((row) => row.map((voxel) => !voxel))),
  surfaceArea: (voxels: boolean[][][]) => {
    let result = 0;
    for (const [z, plane] of voxels.entries()) {
      for (const [y, row] of plane.entries()) {
        for (const [x, voxel] of row.entries()) {
          if (!voxel) continue;
          for (const d of directions) {
            if (voxels[z + d.z]?.[y + d.y]?.[x + d.x]) continue;
            result++;
          }
        }
      }
    }
    return result;
  },
};

export default function solve(input: string) {
  const positions = Positions.parse(input);
  const voxels = Positions.toVoxels(positions);
  const voxelsWithSteamVoxels = Voxels.toFlooded(voxels, { x: 0, y: 0, z: 0 });
  const steamVoxels = Voxels.xor(voxels, voxelsWithSteamVoxels);
  const filledVoxels = Voxels.inv(steamVoxels);
  return Voxels.surfaceArea(filledVoxels);
}
