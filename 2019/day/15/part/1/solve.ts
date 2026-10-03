import { createProgram } from "../../../9/intcode.ts";

export default function solve(input: string) {
  const initialMemory = input.split(",").map(Number);
  const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
  const grid = new Map<`${number},${number}`, number>().set("0,0", 1);
  const queue = [{ x: 0, y: 0, path: [] as number[] }];
  while (queue.length) {
    const { x, y, path } = queue.shift()!;
    for (const [index, [dx, dy]] of directions.entries()) {
      const command = index + 1;
      const nextX = x + dx;
      const nextY = y + dy;
      const key = `${nextX},${nextY}` as const;
      if (grid.has(key)) continue;
      const memory = initialMemory.slice();
      const commands = [...path, command][Symbol.iterator]();
      const robot = createProgram(memory)(() => commands.next().value ?? 0);
      const status = robot.reduce((_, lastOutput) => lastOutput);
      grid.set(key, status);
      if (status === 0) continue;
      if (status === 2) return path.length + 1;
      queue.push({ x: nextX, y: nextY, path: [...path, command] });
    }
  }
}
