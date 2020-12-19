export function solve(input) {
  const value = Number(input);
  return coordinates(value).reduce((sum, n) => sum + Math.abs(n), 0);
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
