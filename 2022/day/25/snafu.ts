const snafuToDecimal: Record<string, number> = {
  "2": 2,
  "1": 1,
  "0": 0,
  "-": -1,
  "=": -2,
};

const decimalToSnafu: Record<number, string> = {
  2: "2",
  1: "1",
  0: "0",
  [-1]: "-",
  [-2]: "=",
};

export function parse(value: string): number {
  return Array.from(value)
    .reverse()
    .reduce((sum, digit, index) => sum + 5 ** index * snafuToDecimal[digit], 0);
}

export function stringify(value: number): string {
  let result = "";
  for (; value; value = Math.floor((value + 2) / 5)) {
    result = decimalToSnafu[((value + 2) % 5) - 2] + result;
  }
  return result;
}
