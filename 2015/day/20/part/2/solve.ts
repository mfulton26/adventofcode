export default function solve(input: string) {
  const elfCount = Number(input) / 11;
  const housePresentCounts = new Int32Array(elfCount);
  for (let elfNumber = 1; elfNumber <= elfCount; elfNumber++) {
    const lastHouseIndex = Math.min(elfNumber * 50, elfCount);
    for (
      let houseIndex = elfNumber;
      houseIndex < lastHouseIndex;
      houseIndex += elfNumber
    ) {
      housePresentCounts[houseIndex] += elfNumber;
    }
  }
  return housePresentCounts.findIndex((count) => count >= elfCount);
}
