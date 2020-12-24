export function solve(input) {
  const lights = Array.from({ length: 1000 }, () => Array(1000).fill(false));
  const instructions = parseInstructions(input);
  followInstructions(instructions, lights);
  return countLit(lights);
}

function* parseInstructions(text) {
  for (const { groups } of text.matchAll(parseInstructions.regExp)) {
    for (const name in parseInstructions.groupTypes) {
      groups[name] = parseInstructions.groupTypes[name](groups[name]);
    }
    yield groups;
  }
}
parseInstructions.regExp = /(?<name>turn on|turn off|toggle) (?<left>\d+),(?<top>\d+) through (?<right>\d+),(?<bottom>\d+)/g;
parseInstructions.groupTypes = {
  name: String,
  left: Number,
  top: Number,
  right: Number,
  bottom: Number,
};

function followInstructions(instructions, lights) {
  for (const { name, left, top, right, bottom } of instructions) {
    for (let rowIndex = top; rowIndex <= bottom; rowIndex++) {
      const row = lights[rowIndex];
      for (let columnIndex = left; columnIndex <= right; columnIndex++) {
        row[columnIndex] = followInstructions.functions[name](row[columnIndex]);
      }
    }
  }
}
followInstructions.functions = {
  "turn on": () => true,
  "turn off": () => false,
  toggle: (light) => !light,
};

function countLit(lights) {
  let count = 0;
  for (const row of lights) {
    for (const light of row) {
      if (light) {
        count++;
      }
    }
  }
  return count;
}
