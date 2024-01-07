export default function solve(input: string) {
  return input.split("\n")
    .flatMap((line, indexOfLine, lines) =>
      Array.from(line.matchAll(/\d+/g))
        .filter(({ [0]: value, index: start }) => {
          if (typeof start !== "number") return false;
          if (line[start - 1]?.match(/[^.]/)) return true;
          const end = start + value.length;
          if (line[end]?.match(/[^.]/)) return true;
          if (indexOfLine - 1 >= 0) {
            const previousLine = lines[indexOfLine - 1];
            for (let index = start - 1; index <= end; index++) {
              if (previousLine[index]?.match(/[^.]/)) return true;
            }
          }
          if (indexOfLine + 1 < lines.length) {
            const nextLine = lines[indexOfLine + 1];
            for (let index = start - 1; index <= end; index++) {
              if (nextLine[index]?.match(/[^.]/)) return true;
            }
          }
          return false;
        })
        .map(Number)
    )
    .reduce((sum, number) => sum + number, 0);
}
