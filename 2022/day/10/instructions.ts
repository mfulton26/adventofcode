export type Instruction = {
  cycles: number;
  next: (current: number) => number;
};

export function parseInstructions(text: string) {
  return text.split("\n").map((line): Instruction => {
    const words = line.split(" ");
    switch (words[0]) {
      case "addx": {
        const value = parseInt(words[1]);
        return { cycles: 2, next: (current: number) => current + value };
      }
      case "noop":
        return { cycles: 1, next: (current) => current };
      default:
        throw new Error("unreachable");
    }
  });
}
