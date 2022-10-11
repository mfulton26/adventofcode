export default function solve(input: string) {
  const ids = input.split("\n").sort();
  for (let i = 1; i < ids.length; i++) {
    const { [i - 1]: a, [i]: b } = ids;
    differsByOneCheck:
    for (let j = 0; j < a.length; j++) {
      if (a[j] === b[j]) continue;
      for (let k = j + 1; k < a.length; k++) {
        if (a[k] === b[k]) continue;
        break differsByOneCheck;
      }
      return `${a.substring(0, j)}${a.substring(j + 1)}`;
    }
  }
}
