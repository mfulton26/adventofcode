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
  return Voxels.surfaceArea(voxels);
}
