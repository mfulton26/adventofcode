import castArray from "../../../lib/castArray.ts";

export type Packet = number | Packet[];

export function parsePacketPairs(text: string) {
  return text.split("\n\n").map((lines) =>
    lines.split("\n").map((line) => JSON.parse(line)) as [Packet, Packet]
  );
}

export function comparePackets(a: Packet, b: Packet): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    for (let index = 0; index < a.length && index < b.length; index++) {
      const possibleResult = comparePackets(a[index], b[index]);
      if (possibleResult !== 0) return possibleResult;
    }
    return a.length - b.length;
  }
  return comparePackets(castArray(a), castArray(b));
}
