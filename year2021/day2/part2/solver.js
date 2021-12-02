export function solve(input) {
  const context = { x: 0, depth: 0, aim: 0 };
  for (const command of parseCommands(input)) command.apply(context);
  return context.x * context.depth;
}

function* parseCommands(text) {
  for (const line of text.split("\n")) yield parseCommand(line);
}

function parseCommand(text) {
  const [name, unitsText] = text.split(" ");
  const units = Number(unitsText);
  switch (name) {
    case "forward":
      return function () {
        this.x += units;
        this.depth += this.aim * units;
      };
    case "down":
      return function () {
        this.aim += units;
      };
    case "up":
      return function () {
        this.aim -= units;
      };
  }
}
