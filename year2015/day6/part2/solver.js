export function solve(input) {
  const lights = Array.from({ length: 1000 }, () => Array(1000).fill(0));
  const instructions = parseInstructions(input);
  followInstructions(instructions, lights);
  return totalBrightness(lights);
}

function* parseInstructions(text) {
  for (const { groups } of text.matchAll(parseInstructions.regExp)) {
    for (const name in groups) {
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
  "turn on": (light) => light + 1,
  "turn off": (light) => (light ? light - 1 : light),
  toggle: (light) => light + 2,
};

function totalBrightness(lights) {
  let total = 0;
  for (const row of lights) {
    for (const light of row) {
      total += light;
    }
  }
  return total;
}
