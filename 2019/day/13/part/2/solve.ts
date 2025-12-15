import { program } from "../../../../intcode.ts";

export default function solve(input: string) {
  const memory = input.split(",").map(Number);
  memory[0] = 2; // free play
  const chunks: number[] = [];
  const grid: string[][] = [];
  let ballX = 0;
  let paddleX = 0;
  let score = NaN;
  for (
    const output of program(memory)((function* () {
      console.log(
        "ballX",
        ballX,
        "paddleX",
        paddleX,
        Math.sign(ballX - paddleX),
      );
      yield 0;
      // move paddle toward ball
      // if (ballX < paddleX) {
      //   yield -1;
      // } else if (ballX > paddleX) {
      //   yield 1;
      // } else {
      //   yield 0;
      // }
    })())
  ) {
    chunks.push(output);
    if (chunks.length < 3) continue;
    const [x, y, tileId] = chunks.splice(0, 3);
    if (x === -1 && y === 0) {
      score = tileId;
      continue;
    }
    // console.log(x, y, tileId);
    grid[y] ??= [];
    switch (tileId) {
      case 0:
        grid[y][x] = " ";
        break;
      case 1:
        grid[y][x] = "#";
        break;
      case 2:
        grid[y][x] = "X";
        break;
      case 3:
        grid[y][x] = "-";
        console.log("PADDLE", { x, y });
        paddleX = x;
        break;
      case 4:
        grid[y][x] = "o";
        console.log("BALL", { x, y });
        ballX = x;
        break;
    }
    console.log(grid.map((row) => row.join("")).join("\n"));
  }
  return score;
}
