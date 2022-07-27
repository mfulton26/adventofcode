export default function solve(input: string) {
  return input.split("\n")
    .map((line) => {
      const [, outputValue] = line.split(" | ");
      return outputValue.split(" ").reduce(
        (count, word) => {
          switch (word.length) {
            case 2:
            case 3:
            case 4:
            case 7:
              return count + 1;
            default:
              return count;
          }
        },
        0,
      );
    })
    .reduce((sum, count) => sum + count, 0);
}
