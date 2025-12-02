const regExp = /^(\d+?)\1+$/;

export default function solve(input: string) {
  const ranges = input.split(",").map((line) => line.split("-").map(Number));
  let sum = 0;
  for (const [first, last] of ranges) {
    for (let id = first; id <= last; id++) {
      if (regExp.test(`${id}`)) {
        sum += id;
      }
    }
  }
  return sum;
}
