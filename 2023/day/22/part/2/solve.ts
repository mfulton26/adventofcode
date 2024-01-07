type Vector = { x: number; y: number; z: number };
type Brick = { label: string; bottomLeft: Vector; topRight: Vector };

export default function solve(input: string) {
  const bricks = input.split("\n").map<Brick>((line, index) => {
    const label = String.fromCharCode("A".charCodeAt(0) + index);
    const [a, b] = line.split("~").map((word) => {
      const [x, y, z] = word.split(",").map(Number);
      return { x, y, z };
    });
    return {
      label,
      bottomLeft: {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        z: Math.min(a.z, b.z),
      },
      topRight: {
        x: Math.max(a.x, b.x),
        y: Math.max(a.y, b.y),
        z: Math.max(a.z, b.z),
      },
    };
  });
  const bricksInFront = new Map<number, Map<number, Brick>>();
  bricks.sort(({ bottomLeft: { z: a } }, { bottomLeft: { z: b } }) => a - b);
  const dependencies = bricks.reduce(
    (map, brick) => map.set(brick, new Set<Brick>()),
    new Map<Brick, Set<Brick>>(),
  );
  const dependents = bricks.reduce(
    (map, brick) => map.set(brick, new Set<Brick>()),
    new Map<Brick, Set<Brick>>(),
  );
  for (const brick of bricks) {
    let falling = true;
    while (falling && brick.bottomLeft.z > 1) {
      for (let y = brick.bottomLeft.y; y <= brick.topRight.y; y++) {
        if (!bricksInFront.has(y)) bricksInFront.set(y, new Map());
        const row = bricksInFront.get(y)!;
        for (let x = brick.bottomLeft.x; x <= brick.topRight.x; x++) {
          const brickBehind = row.get(x);
          if (brickBehind === undefined) continue;
          if (brick.bottomLeft.z - 1 > brickBehind.topRight.z) continue;
          falling = false;
          dependencies.get(brick)!.add(brickBehind);
          dependents.get(brickBehind)!.add(brick);
        }
      }
      if (falling) brick.bottomLeft.z--, brick.topRight.z--;
    }
    for (let y = brick.bottomLeft.y; y <= brick.topRight.y; y++) {
      if (!bricksInFront.has(y)) bricksInFront.set(y, new Map());
      const row = bricksInFront.get(y)!;
      for (let x = brick.bottomLeft.x; x <= brick.topRight.x; x++) {
        row.set(x, brick);
      }
    }
  }
  let sum = -0;
  for (const brick of bricks) {
    const fallenBricks = new Set<Brick>().add(brick);
    for (const fallenBrick of fallenBricks) {
      falling: for (const dependent of dependents.get(fallenBrick)!) {
        const dependentDependencies = dependencies.get(dependent)!;
        for (const dependentDependency of dependentDependencies) {
          if (fallenBricks.has(dependentDependency)) continue;
          continue falling;
        }
        fallenBricks.add(dependent);
      }
    }
    sum += fallenBricks.size - 1;
  }
  return sum;
}
