function parseGalaxyPositions(text: string) {
  return text.split("\n").flatMap((line, y) =>
    Array.from(line).flatMap((char, x) => char === "#" ? [{ x, y }] : [])
  );
}

function expandUniverse(positions: ReturnType<typeof parseGalaxyPositions>) {
  for (const coordinate of ["x", "y"] as const) {
    positions.sort(({ [coordinate]: a }, { [coordinate]: b }) => a - b).forEach(
      (position, i, positions) => {
        if (i === 0) return;
        const space = position[coordinate] - positions[i - 1][coordinate] - 1;
        if (space <= 0) return;
        for (let j = i; j < positions.length; j++) {
          positions[j][coordinate] += space;
        }
      },
    );
  }
}

export default function solve(input: string) {
  const galaxyPositions = parseGalaxyPositions(input);
  expandUniverse(galaxyPositions);
  let sum = 0;
  for (let i = 0; i < galaxyPositions.length; i++) {
    const a = galaxyPositions[i];
    for (let j = i + 1; j < galaxyPositions.length; j++) {
      const b = galaxyPositions[j];
      const distance = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      sum += distance;
    }
  }
  return sum;
}
