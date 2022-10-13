export default function solve(input: string) {
  const [firstLine, secondLine] = input.split("\n");
  const earliestDepartureTime = Number(firstLine);
  const busIds = secondLine.split(",").map(Number).filter(isFinite);
  const [[departureTime, busId]] = busIds
    .map((busId) => [Math.ceil(earliestDepartureTime / busId) * busId, busId])
    .sort(([a], [b]) => a - b);
  const waitTime = departureTime - earliestDepartureTime;
  return busId * waitTime;
}
