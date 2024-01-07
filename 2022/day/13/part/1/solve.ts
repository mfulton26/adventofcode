import { comparePackets, parsePacketPairs } from "../../packet.ts";

export default function solve(input: string) {
  const packetPairs = parsePacketPairs(input);
  let sumOfIndices = 0;
  for (const [index, [a, b]] of packetPairs.entries()) {
    const result = comparePackets(a, b);
    if (result < 0) sumOfIndices += index + 1;
  }
  return sumOfIndices;
}
