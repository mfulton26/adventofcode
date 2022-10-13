export default function solve(input: string) {
  const [, _left, _right, bottom, _top] = /x=(\d+)..(\d+), y=(-?\d+)..(-?\d+)/
    .exec(input)!.map(Number);
  const maxVy = -bottom - 1;
  return (maxVy * (maxVy + 1)) / 2;
}
