const instructionRegExp =
  /^(?<command>rect) (?<A>\d+)x(?<B>\d+)$|^(?<command>rotate) (?<axis>row y|column x)=(?<index>\d+) by (?<amount>\d+)$/gm;

function* parseInstructions(input: string) {
  for (const { groups = {} } of input.matchAll(instructionRegExp)) {
    const command = groups.command as "rect" | "rotate";
    if (command === "rect") {
      yield { command, width: +groups.A, height: +groups.B };
    } else {
      const axis = groups.axis.slice(0, -2) as "row" | "column";
      yield { command, axis, index: +groups.index, amount: +groups.amount };
    }
  }
}

export default function solve(input: string, { width = 50, height = 6 } = {}) {
  const screen = Array.from(
    { length: height },
    () => Array.from({ length: width }, () => false),
  );
  for (const args of parseInstructions(input)) {
    switch (args.command) {
      case "rect": {
        for (let y = 0; y < args.height; y++) {
          const row = screen[y];
          for (let x = 0; x < args.width; x++) row[x] = true;
        }
        break;
      }
      case "rotate": {
        if (args.axis === "row") {
          const row = screen[args.index];
          row.splice(0, 0, ...row.splice(-args.amount));
        } else {
          const column = screen.map((row) => row[args.index]);
          column.splice(0, 0, ...column.splice(-args.amount));
          screen.forEach((row, rowIndex) => row[args.index] = column[rowIndex]);
        }
        break;
      }
    }
  }
  return screen.map((row) => row.map((p) => p ? "#" : ".").join("")).join("\n");
}
