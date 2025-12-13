export function parseManual(text: string) {
  return text.split("\n").map((line) => {
    const [lightsText, ...rest] = line.split(" ");
    const lights = lightsText.slice(1, -1);
    const buttons = rest.slice(0, -1)
      .map((text) => text.slice(1, -1).split(",").map(Number));
    const requirements = rest.at(-1)!.slice(1, -1).split(",").map(Number);
    return { lights, buttons, requirements };
  });
}
