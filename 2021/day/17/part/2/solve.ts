export default function solve(input: string) {
  const [, left, right, bottom, top] = /x=(\d+)..(\d+), y=(-?\d+)..(-?\d+)/
    .exec(input)!.map(Number);
  let count = 0;
  const minVx = Math.ceil((Math.sqrt(8 * left + 1) - 1) / 2);
  const maxVx = right;
  const maxVy = -bottom - 1;
  for (let vx = minVx; vx <= maxVx; vx++) {
    test:
    for (let vy = maxVy; vy >= bottom; vy--) {
      for (
        let step = 0, x = 0, y = 0;;
        step++, x += Math.max(vx - step + 1, 0), y += vy - step + 1
      ) {
        if (x > right || y < bottom) continue test;
        if (x >= left && x <= right && y <= top && y >= bottom) break;
      }
      count++;
    }
  }
  return count;
}
