declare module "@graph-algorithm/minimum-cut" {
  function mincut<N, E extends (readonly [N, N])>(edges: E[]): Generator<E>;
}
