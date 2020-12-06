export function solve(input) {
  const value = Number(input);
  const sums = { [[0, 0]]: 1 };
  for (let n = 2; ; n++) {
    const [x, y] = coordinates(n);
    let sum = 0;
    for (let dx = -1; dx <= 1; dx++) {
      const ax = x + dx;
      for (let dy = -1; dy <= 1; dy++) {
        const ay = y + dy;
        sum += sums[[ax, ay]] ?? 0;
      }
    }
    sums[[x, y]] = sum;
    if (sum > value) {
      return sum;
    }
  }
}

function coordinates(n) {
  let x = 0;
  let y = 0;
  for (; n > 1; n--) {
    const k = Math.floor(Math.sqrt(4 * (n - 2) + 1)) % 4;
    const angle = (k * Math.PI) / 2;
    x += Math.round(Math.sin(angle));
    y -= Math.round(Math.cos(angle));
  }
  return [x, y];
}
