export default function solve(input: string) {
  const [seedsLine, ...paragraphs] = input.split("\n\n");
  const seeds = seedsLine.slice("seeds: ".length).split(" ").map(Number);
  const maps = paragraphs.map((paragraph) => {
    const [heading, ...lines] = paragraph.split("\n");
    const [
      source,
      destination,
    ] = heading.slice(0, -" map:".length).split("-to-");
    const ranges = lines.map((line) => {
      const [
        destinationStart,
        sourceStart,
        length,
      ] = line.split(" ").map(Number);
      return { destinationStart, sourceStart, length };
    });
    return { source, destination, ranges };
  });
  const locations = seeds.map((value) => {
    for (const map of maps) {
      const range = map.ranges.find(({ sourceStart, length }) =>
        value >= sourceStart && value < sourceStart + length
      );
      if (range === undefined) continue;
      const { destinationStart, sourceStart } = range;
      const offset = destinationStart - sourceStart;
      value += offset;
    }
    return value;
  });
  return Math.min(...locations);
}
