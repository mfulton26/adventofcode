export default function solve(input: string) {
  const statements = input.split("\n");
  const memory = new Map<bigint, bigint>();
  let bitsToSet: bigint, bitsToNotClear: bigint;
  for (const statement of statements) {
    const [lhs, rhs] = statement.split(" = ");
    if (lhs === "mask") {
      bitsToSet = BigInt(`0b${rhs.replace(/X/g, "0")}`);
      bitsToNotClear = BigInt(`0b${rhs.replace(/X/g, "1")}`);
    } else {
      const address = BigInt(lhs.slice(4, -1));
      const value = (BigInt(rhs) | bitsToSet!) & bitsToNotClear!;
      memory.set(address, value);
    }
  }
  return Number([...memory.values()].reduce((sum, value) => sum + value, 0n));
}
