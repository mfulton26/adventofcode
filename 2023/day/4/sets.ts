export function intersection<T>(a: Set<T>, b: Set<T>) {
  if (a.size < b.size) return intersection(b, a);
  const result = new Set<T>();
  for (const value of b) if (a.has(value)) result.add(value);
  return result;
}
