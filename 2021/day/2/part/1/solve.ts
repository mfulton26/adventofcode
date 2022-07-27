export default function solve(input: string) {
  let x = 0, depth = 0;
  for (const command of input.split("\n")) {
    const [op, arg] = command.split(" ");
    const units = Number(arg);
    switch (op) {
      case "forward":
        x += units;
        break;
      case "down":
        depth += units;
        break;
      case "up":
        depth -= units;
        break;
    }
  }
  return x * depth;
}
