export function countPaths<T>(graph: Map<T, Set<T>>, start: T, end: T) {
  const counts = new Map<T, number>();
  function dfs(node: T) {
    if (node === end) return 1;
    if (counts.has(node)) return counts.get(node)!;
    let count = 0;
    graph.get(node)?.forEach((neighbor) => count += dfs(neighbor));
    counts.set(node, count);
    return count;
  }
  return dfs(start);
}
