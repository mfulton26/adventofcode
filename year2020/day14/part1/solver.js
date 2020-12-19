export function solve(input) {
  const statements = input.split("\n");
  const memory = new Map();
  let bitsToSet, bitsToNotClear;
  for (const statement of statements) {
    const [lhs, rhs] = statement.split(" = ");
    if (lhs === "mask") {
      bitsToSet = BigInt(`0b${rhs.replace(/X/g, "0")}`);
      bitsToNotClear = BigInt(`0b${rhs.replace(/X/g, "1")}`);
    } else {
      const address = BigInt(lhs.slice(4, -1));
      const value = (BigInt(rhs) | bitsToSet) & bitsToNotClear;
      memory.set(address, value);
    }
  }
  return Array.from(memory.values())
    .reduce((sum, value) => sum + value, 0n)
    .toString();
}
