function shapeCharToShapeScore(char: string, base: string) {
  return 1 + char.charCodeAt(0) - base.charCodeAt(0);
}

function getOutcomeScore(theirShapeScore: number, yourShapeScore: number) {
  if (theirShapeScore === (yourShapeScore % 3) + 1) return 0;
  if (theirShapeScore === yourShapeScore) return 3;
  return 6;
}

function determineDesiredShapeScore(
  theirShapeScore: number,
  outcomeChar: string,
) {
  switch (outcomeChar) {
    case "X":
      return (theirShapeScore + 1) % 3 + 1;
    case "Y":
      return theirShapeScore;
    case "Z":
      return theirShapeScore % 3 + 1;
    default:
      throw new SyntaxError(`outcome char not supported: ${outcomeChar}`);
  }
}

export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [theirShapeChar, outcomeChar] = line.split(" ");
      const theirShapeScore = shapeCharToShapeScore(theirShapeChar, "A");
      const yourShapeScore = determineDesiredShapeScore(
        theirShapeScore,
        outcomeChar,
      );
      const outcomeScore = getOutcomeScore(theirShapeScore, yourShapeScore);
      return yourShapeScore + outcomeScore;
    })
    .reduce((totalScore, score) => totalScore + score, 0);
}
