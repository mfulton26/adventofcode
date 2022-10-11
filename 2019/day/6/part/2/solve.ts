export default function solve(input: string) {
  const map = new Map(
    input.split("\n").map((line) => {
      const [value, key] = line.split(")");
      return [key, value];
    }),
  );
  function* pathGenerator(key: string) {
    while (key !== "COM") {
      yield key;
      key = map.get(key)!;
    }
    yield key;
  }
  const me = [...pathGenerator("YOU")].reverse();
  const santa = [...pathGenerator("SAN")].reverse();
  const lcaIndex = me.findIndex((key, index) => key !== santa[index]);
  return me.slice(lcaIndex).length + santa.slice(lcaIndex).length - 2;
}
