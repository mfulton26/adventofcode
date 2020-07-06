/**
 * @param {string} input
 * @returns {number}
 */
export function solve(input) {
  const map = new Map(
    input.split("\n").map((line) => {
      const [value, key] = line.split(")");
      return [key, value];
    })
  );
  /**
   * @param {string} key
   */
  function* pathGenerator(key) {
    while (key !== "COM") {
      yield key;
      key = /** @type {string} */ (map.get(key));
    }
    yield key;
  }
  const me = Array.from(pathGenerator("YOU")).reverse();
  const santa = Array.from(pathGenerator("SAN")).reverse();
  const lcaIndex = me.findIndex((key, index) => key !== santa[index]);
  return me.slice(lcaIndex).length + santa.slice(lcaIndex).length - 2;
}
