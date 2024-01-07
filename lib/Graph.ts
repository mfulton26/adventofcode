type Edge<N> = readonly [N, N];

type Nodes<N> = Set<N>;
type Edges<N> = Set<Edge<N>>;
type Index<N> = Map<N, Map<N, readonly [N, N]>>;

const nodes$ = new WeakMap<Graph<unknown>, Nodes<unknown>>();
const edges$ = new WeakMap<Graph<unknown>, Edges<unknown>>();
const index$ = new WeakMap<Graph<unknown>, Index<unknown>>();

export default class Graph<N> {
  constructor(iterable?: Iterable<readonly [N] | Edge<N>> | null) {
    nodes$.set(this, new Set());
    edges$.set(this, new Set());
    index$.set(this, new Map());
    for (const value of iterable ?? []) {
      switch (value.length) {
        case 1: {
          this.addNode(...value);
          continue;
        }
        case 2: {
          this.addEdge(...value);
          continue;
        }
      }
    }
  }

  get [Symbol.toStringTag](): string {
    return "Graph";
  }

  /** The number of edges in this graph. */
  get order(): number {
    return nodes$.get(this)!.size;
  }

  /** The number of edges plus the number of nodes in this graph. */
  get size(): number {
    return this.order + edges$.get(this)!.size;
  }

  *[Symbol.iterator](): IterableIterator<[N] | [N, N]> {
    for (const node of nodes$.get(this) as Nodes<N>) yield [node];
    for (const edge of edges$.get(this) as Edges<N>) yield [...edge];
  }

  [Symbol.for("Deno.customInspect")](
    inspect: typeof Deno.inspect,
    options: Deno.InspectOptions,
  ): string {
    return `Graph ${
      inspect({ nodes: nodes$.get(this), edges: edges$.get(this) }, options)
    }`;
  }

  addEdge(x: N, y: N): this {
    if (this.hasEdge(x, y)) return this;
    this.addNode(x);
    this.addNode(y);
    const edge = [x, y] as const;
    (edges$.get(this) as Edges<N>).add(edge);
    const index = index$.get(this) as Index<N>;
    if (!index.has(x)) index.set(x, new Map());
    index.get(x)!.set(y, edge);
    if (!index.has(y)) index.set(y, new Map());
    index.get(y)!.set(x, edge);
    return this;
  }

  addNode(node: N): this {
    (nodes$.get(this) as Nodes<N>).add(node);
    return this;
  }

  *adjacencies(node: N): IterableIterator<N> {
    yield* (index$.get(this) as Index<N>).get(node)?.keys() ?? [];
  }

  clear(): void {
    nodes$.get(this)!.clear();
    edges$.get(this)!.clear();
    index$.get(this)!.clear();
  }

  deleteEdge(x: N, y: N): boolean {
    const index = index$.get(this) as Index<N>;
    {
      const edgeByAdjacency = index.get(x);
      if (!edgeByAdjacency?.delete(y)) return false;
      if (edgeByAdjacency.size === 0) index.delete(x);
    }
    const edgeByAdjacency = index.get(y)!;
    index.delete(y);
    if (edgeByAdjacency.size === 0) edgeByAdjacency.delete(x);
    return true;
  }

  deleteNode(node: N): boolean {
    if (!(nodes$.get(this) as Nodes<N>).delete(node)) return false;
    const index = index$.get(this) as Index<N>;
    const edgeByAdjacency = index.get(node);
    if (edgeByAdjacency !== undefined) {
      for (const [adjacency, edge] of edgeByAdjacency) {
        (edges$.get(this) as Edges<N>).delete(edge);
        const edgeByAdjacency = index.get(adjacency)!;
        edgeByAdjacency.delete(node);
        if (edgeByAdjacency.size === 0) index.delete(adjacency);
      }
      if (edgeByAdjacency.size === 0) index.delete(node);
    }
    return true;
  }

  *edges(): IterableIterator<[N, N]> {
    for (const edge of edges$.get(this) as Edges<N>) yield [...edge];
  }

  entries(): IterableIterator<[N] | [N, N]> {
    throw new Error();
  }
  static {
    Graph.prototype.entries = Graph.prototype[Symbol.iterator];
  }

  hasNode(node: N): boolean {
    return (nodes$.get(this) as Nodes<N>).has(node);
  }

  hasEdge(x: N, y: N): boolean {
    return (index$.get(this) as Index<N>).get(x)?.has(y) ?? false;
  }

  *nodes(): IterableIterator<N> {
    yield* nodes$.get(this) as Nodes<N>;
  }
}
