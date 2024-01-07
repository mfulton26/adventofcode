export default function solve(input: string) {
  const [seedsLine, ...paragraphs] = input.split("\n\n");
  const seedRanges = Array.from(
    seedsLine.matchAll(/(?<start>\d+) (?<length>\d+)/g),
    ([, startText, lengthText]) => {
      const start = Number(startText);
      const length = Number(lengthText);
      const end = start + length - 1;
      return { start, end };
    },
  );
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
      const destinationEnd = destinationStart + length - 1;
      const sourceEnd = sourceStart + length - 1;
      return {
        destinationStart,
        destinationEnd,
        sourceStart,
        sourceEnd,
        length,
      };
    });
    ranges.sort(({ sourceStart: a }, { sourceStart: b }) => a - b);
    return { source, destination, ranges };
  });
  return Math.min(
    ...seedRanges.map(({ start, end }) => {
      let valueRanges = [{ start, end }];
      for (const map of maps) {
        valueRanges = valueRanges.flatMap(({ start, end }) => {
          const ranges = map.ranges.filter(({ sourceStart, sourceEnd }) =>
            start <= sourceEnd && end >= sourceStart
          );
          if (ranges.length === 0) return [{ start, end }];
          const result: typeof valueRanges = [];
          {
            const { sourceStart } = ranges.at(0)!;
            if (start < sourceStart) {
              result.push({ start, end: sourceStart - 1 });
            }
          }
          for (let i = 0, j = 1; i < ranges.length; i++, j++) {
            {
              const { destinationStart, sourceStart, sourceEnd } = ranges[i];
              const offset = destinationStart - sourceStart;
              result.push({
                start: Math.max(start, sourceStart) + offset,
                end: Math.min(end, sourceEnd) + offset,
              });
            }
            if (j === ranges.length) continue;
            {
              const start = ranges[i].sourceEnd + 1;
              const end = ranges[j].sourceStart - 1;
              if (start <= end) result.push({ start, end });
            }
          }
          {
            const { sourceEnd } = ranges.at(-1)!;
            if (end > sourceEnd) {
              result.push({ start: sourceEnd + 1, end });
            }
          }
          return result;
        });
      }
      return Math.min(...valueRanges.map(({ start }) => start));
    }),
  );
}
