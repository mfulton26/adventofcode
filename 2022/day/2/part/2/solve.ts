const scores = {
  A: { X: 0 + 3, Y: 3 + 1, Z: 6 + 2 },
  B: { X: 0 + 1, Y: 3 + 2, Z: 6 + 3 },
  C: { X: 0 + 2, Y: 3 + 3, Z: 6 + 1 },
};

export default function solve(input: string) {
  let totalScore = 0;
  for (const line of input.split("\n")) {
    const [theirs, yours] = line.split(" ") as [
      "A" | "B" | "C",
      "X" | "Y" | "Z",
    ];
    totalScore += scores[theirs][yours];
  }
  return totalScore;
}
