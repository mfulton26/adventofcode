export default function solve(input: string) {
  const rows = input.split("\n").map((line) => Array.from(line));
  const beamColumnIndexes = new Set([rows[0].indexOf("S")]);
  let splitCount = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (const beamColumnIndex of beamColumnIndexes) {
      if (rows[rowIndex + 1]?.[beamColumnIndex] !== "^") continue;
      beamColumnIndexes.delete(beamColumnIndex);
      for (const direction of [-1, 1]) {
        beamColumnIndexes.add(beamColumnIndex + direction);
      }
      splitCount++;
    }
  }
  return splitCount;
}
