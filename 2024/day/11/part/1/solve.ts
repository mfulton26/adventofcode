export default function solve(input: string) {
  let stones = input.split(" ").map(Number);
  for (let n = 0; n < 25; n++) {
    stones = stones.flatMap((stone) => {
      if (stone === 0) return [1];
      const stringified = `${stone}`;
      if (stringified.length % 2 === 0) {
        const midLength = stringified.length / 2;
        const left = +stringified.substring(0, midLength);
        const right = +stringified.substring(midLength);
        return [left, right];
      }
      return [stone * 2024];
    });
  }
  return stones.length;
}
