export default function* subsets<T>(set: Set<T>) {
  const size = 1 << set.size;
  yield new Set<T>();
  for (let setBits = 1; setBits < size; setBits++) {
    const subset = new Set<T>();
    let mask = 1;
    for (const value of set) {
      if (setBits & mask) subset.add(value);
      mask <<= 1;
    }
    yield subset;
  }
}
