export function parse(text: string) {
  return text.split("\n").map((line) => {
    const [left, right] = line.split(": ");
    const id = Number(left.slice("Game ".length));
    const showings = right.split("; ").map((text) =>
      Object.fromEntries(
        text.split(", ").map((text) => {
          const [numberText, color] = text.split(" ");
          const number = Number(numberText);
          return [color, number];
        }),
      )
    );
    return { id, showings };
  });
}
