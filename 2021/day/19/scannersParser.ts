import type { Coordinates, Scanner } from "./model.d.ts";

import intern from "../../../lib/intern.ts";

function parseCoordinates(text: string) {
  return intern(text.split(",").map(Number) as Coordinates);
}

function parseScanner(text: string) {
  const positions = new Set(text.split("\n").slice(1).map(parseCoordinates));
  return { positions } as Scanner;
}

export function parseScanners(text: string) {
  return text.split("\n\n").map(parseScanner);
}
