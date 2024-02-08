function parseNumbersAtIndex(line: string, index: number) {
  if (line[index]?.match(/\d/)) {
    let start = index;
    while (line[start - 1]?.match(/\d/)) start--;
    let end = index + 1;
    while (line[end]?.match(/\d/)) end++;
    return [Number(line.slice(start, end))];
  }
  const result = [] as number[];
  if (line[index - 1]?.match(/\d/)) {
    let start = index - 1;
    while (line[start - 1]?.match(/\d/)) start--;
    result.push(Number(line.slice(start, index)));
  }
  if (line[index + 1]?.match(/\d/)) {
    let end = index + 2;
    while (line[end]?.match(/\d/)) end++;
    result.push(Number(line.slice(index + 1, end)));
  }
  return result;
}

export default function solve(input: string) {
  return input.split("\n")
    .flatMap((line, indexOfLine, lines) =>
      Array.from(line.matchAll(/\*/g)).flatMap(({ index }) => {
        if (index === undefined) return [];
        const numbers = parseNumbersAtIndex(line, index);
        if (indexOfLine > 0) {
          numbers.push(...parseNumbersAtIndex(lines[indexOfLine - 1], index));
        }
        if (indexOfLine < lines.length - 1) {
          numbers.push(...parseNumbersAtIndex(lines[indexOfLine + 1], index));
        }
        if (numbers.length === 2) return [numbers[0] * numbers[1]];
        if (numbers.length > 2) {
          throw new RangeError("more than 2 numbers found adjacent to *");
        }
        return [];
      })
    )
    .reduce((sum, number) => sum + number, 0);
}
