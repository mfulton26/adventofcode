export function parseRotations(text: string): number[] {
  return text.replaceAll("L", "-").replaceAll("R", "").split("\n").map(Number);
}
