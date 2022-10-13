export default function solve(input: string) {
  const packet = parsePacket(input);
  return evaluate(packet);
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

function evaluate({ typeId, literalValue, children }: Packet): number {
  if (typeId === 4) return literalValue!;
  const values = children.map(evaluate);
  switch (typeId) {
    case 0:
      return values.reduce((sum, value) => sum + value, 0);
    case 1:
      return values.reduce((product, value) => product * value, 1);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] === values[1] ? 1 : 0;
    default:
      throw new Error(`typeId ${typeId} not supported`);
  }
}
