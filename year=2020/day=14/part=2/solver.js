export function solve(input) {
  const statements = input.split("\n");
  const memory = new Map();
  let bitsToSet, floatingBitIndexes;
  for (const statement of statements) {
    const [lhs, rhs] = statement.split(" = ");
    if (lhs === "mask") {
      bitsToSet = BigInt(`0b${rhs.replace(/X/g, "0")}`);
      floatingBitIndexes = Array.from(rhs.matchAll(/X/g), ({ index }) =>
        BigInt(35 - index)
      );
    } else {
      let address = BigInt(lhs.slice(4, -1)) | bitsToSet;
      const value = BigInt(rhs);
      const count = Math.pow(2, floatingBitIndexes.length);
      for (let bits = 0; bits < count; bits++) {
        let testBits = bits;
        for (const floatingBitIndex of floatingBitIndexes) {
          const floatingBit = 1n << floatingBitIndex;
          if (testBits % 2 === 0) {
            address &= ~floatingBit;
          } else {
            address |= floatingBit;
          }
          testBits >>= 1;
        }
        memory.set(address, value);
      }
    }
  }
  return Array.from(memory.values())
    .reduce((sum, value) => sum + value, 0n)
    .toString();
}
