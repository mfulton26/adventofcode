export default function solve(input: string) {
  const map = new Map(
    input.split("\n").map((line) => {
      const [value, key] = line.split(")");
      return [key, value];
    }),
  );
  let count = 0;
  for (let key of map.keys()) {
    for (; key !== "COM"; count++) {
      key = map.get(key)!;
    }
  }
  return count;
}
