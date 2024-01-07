import { comparePackets, type Packet, parsePacketPairs } from "../../packet.ts";

export default function solve(input: string) {
  const packetPairs = parsePacketPairs(input);
  const dividerPackets = [[[2]], [[6]]] as [Packet, Packet];
  const packets = [...packetPairs.flat(), ...dividerPackets]
    .sort(comparePackets);
  const packetIndexes = packets.reduce(
    (map, packet, index) => map.set(packet, index + 1),
    new Map<Packet, number>(),
  );
  return dividerPackets.reduce<number>(
    (product, dividerPacket) => product * packetIndexes.get(dividerPacket)!,
    1,
  );
}
