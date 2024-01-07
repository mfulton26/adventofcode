function shapeCharToShapeScore(char: string, base: string) {
  return 1 + char.charCodeAt(0) - base.charCodeAt(0);
}

function getOutcomeScore(theirShapeScore: number, yourShapeScore: number) {
  if (theirShapeScore === (yourShapeScore % 3) + 1) return 0;
  if (theirShapeScore === yourShapeScore) return 3;
  return 6;
}

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [theirShapeChar, yourShapeChar] = line.split(" ");
      const theirShapeScore = shapeCharToShapeScore(theirShapeChar, "A");
      const yourShapeScore = shapeCharToShapeScore(yourShapeChar, "X");
      const outcomeScore = getOutcomeScore(theirShapeScore, yourShapeScore);
      return yourShapeScore + outcomeScore;
    })
    .reduce((totalScore, score) => totalScore + score, 0);
}
