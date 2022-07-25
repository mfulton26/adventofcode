export default function solve(input: string) {
  let x = 0, depth = 0, aim = 0;
  for (const command of input.trim().split("\n")) {
    const [op, arg] = command.split(" ");
    const units = Number(arg);
    switch (op) {
      case "forward":
        x += units;
        depth += aim * units;
        break;
      case "down":
        aim += units;
        break;
      case "up":
        aim -= units;
        break;
    }
  }
  return x * depth;
}
