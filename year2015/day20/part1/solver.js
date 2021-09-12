export function solve(input) {
  const elfCount = Number(input) / 10;
  const housePresentCounts = new Int32Array(elfCount);
  for (let elfNumber = 1; elfNumber <= elfCount; elfNumber++) {
    for (
      let houseIndex = elfNumber;
      houseIndex < elfCount;
      houseIndex += elfNumber
    ) {
      housePresentCounts[houseIndex] += elfNumber;
    }
  }
  return housePresentCounts.findIndex((count) => count >= elfCount);
}
