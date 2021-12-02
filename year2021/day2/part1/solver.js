export function solve(input) {
  const context = { x: 0, depth: 0 };
  for (const command of parseCommands(input)) command.apply(context);
  return context.x * context.depth;
}

function* parseCommands(text) {
  for (const line of text.split("\n")) yield parseCommand(line);
}

function parseCommand(text) {
  const [name, unitsText] = text.split(" ");
  const units = Number(unitsText);
  return commandParsers[name](units);
}

const commandParsers = {
  forward: (units) =>
    function () {
      this.x += units;
    },
  down: (units) =>
    function () {
      this.depth += units;
    },
  up: (units) =>
    function () {
      this.depth -= units;
    },
};
