const scores = {
  "A": { "X": 1 + 3, "Y": 2 + 6, "Z": 3 + 0 },
  "B": { "X": 1 + 0, "Y": 2 + 3, "Z": 3 + 6 },
  "C": { "X": 1 + 6, "Y": 2 + 0, "Z": 3 + 3 },
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
