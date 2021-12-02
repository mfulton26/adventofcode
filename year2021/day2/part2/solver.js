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
  return commandParsers[name](units)
}

const commandParsers = {
  forward: (units) =>
    function () {
      this.x += units;
      this.depth += this.aim * units;
    },
  down: (units) =>
    function () {
      this.aim += units;
    },
  up: (units) =>
    function () {
      this.aim -= units;
    },
};
