import type { Position } from "./model.d.ts";

import intern from "../../../lib/intern.ts";

export default class HeightMap extends Map<Position, number> {
  static #neighborPositionOffsets = [[0, 1], [0, -1], [-1, 0], [1, 0]] as const;

  constructor() {
    super();
  }

  delete(key: Position): boolean {
    return super.delete(intern(key));
  }

  get(key: Position): number | undefined {
    return super.get(intern(key));
  }

  has(key: Position): boolean {
    return super.has(intern(key));
  }

  set(key: Position, value: number): this {
    return super.set(intern(key), value);
  }

  *neighborKeys(position: Position): IterableIterator<Position> {
    const height = this.get(position);
    if (height === undefined) return;
    const [x, y] = position;
    for (const [dx, dy] of HeightMap.#neighborPositionOffsets) {
      const neighborPosition = intern<Position>([x + dx, y + dy]);
      if (!this.has(position)) continue;
      yield neighborPosition;
    }
  }
}
