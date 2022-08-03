export default function solve(input: string) {
  const packet = parsePacket(input);
  return sumVersions(packet);
}

type Packet = {
  version: number;
  typeId: number;
  literalValue: number;
  lengthTypeId?: undefined;
  children: Packet[];
} | {
  version: number;
  typeId: number;
  literalValue?: undefined;
  lengthTypeId: number;
  children: Packet[];
};

function parsePacket(hex: string) {
  const bits = BigInt(`0x${hex}`).toString(2).padStart(hex.length * 4, "0");
  let index = 0;
  function parseNumber(length: number) {
    return parseInt(bits.substring(index, index += length), 2);
  }
  function parsePacket(): Packet {
    const version = parseNumber(3);
    const typeId = parseNumber(3);
    switch (typeId) {
      case 4: {
        let literalValueBits = "";
        while (bits[index++] === "1") {
          literalValueBits += bits.slice(index, index += 4);
        }
        literalValueBits += bits.slice(index, index += 4);
        const literalValue = parseInt(literalValueBits, 2);
        return { version, typeId, literalValue, children: [] };
      }
      default: {
        const lengthTypeId = parseNumber(1);
        const children: Packet[] = [];
        switch (lengthTypeId) {
          case 0: {
            const length = parseNumber(15);
            const stop = index + length;
            while (index < stop) children.push(parsePacket());
            break;
          }
          case 1: {
            const count = parseNumber(11);
            for (let n = 0; n < count; n++) children.push(parsePacket());
            break;
          }
        }
        return { version, typeId, lengthTypeId, children };
      }
    }
  }
  return parsePacket();
}

function sumVersions({ version, children }: Packet): number {
  return version +
    children.reduce((sum, packet) => sum + sumVersions(packet), 0);
}
