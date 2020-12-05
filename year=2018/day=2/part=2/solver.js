export function solve(input) {
  const ids = input.split("\n").sort();
  for (let i = 1; i < ids.length; i++) {
    const a = ids[i - 1];
    const b = ids[i];
    differsByOneCheck: for (let j = 0; j < a.length; j++) {
      if (a[j] !== b[j]) {
        for (let k = j + 1; k < a.length; k++) {
          if (a[k] !== b[k]) {
            break differsByOneCheck;
          }
        }
        return `${a.substring(0, j)}${a.substring(j + 1)}`;
      }
    }
  }
}
