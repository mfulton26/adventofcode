interface Node<T> {
  value: T;
  previous: Node<T>;
  next: Node<T>;
}

function mix(nodes: Node<number>[]) {
  for (const node of nodes) {
    const moves = node.value % (nodes.length - 1);
    if (moves === 0) continue;
    let newNext = moves < 0 ? node : node.next;
    for (let n = 0; n > moves; n--) newNext = newNext.previous;
    for (let n = 0; n < moves; n++) newNext = newNext.next;
    node.previous.next = node.next;
    node.next.previous = node.previous;
    node.next = newNext;
    node.previous = newNext.previous;
    newNext.previous.next = node;
    newNext.previous = node;
  }
}

function findGroveCoordinates(nodes: Node<number>[]) {
  let node = nodes.find(({ value }) => value === 0);
  if (!node) throw new Error("no node with value 0");
  const moves = 1_000 % nodes.length;
  for (let n = 0; n < moves; n++) node = node.next;
  const { value: x } = node;
  for (let n = 0; n < moves; n++) node = node.next;
  const { value: y } = node;
  for (let n = 0; n < moves; n++) node = node.next;
  const { value: z } = node;
  return { x, y, z };
}

export default function solve(input: string) {
  const nodes = <Node<number>[]> input.split("\n")
    .map(Number)
    .map((value) => ({ value }))
    .map((node, index, nodes) =>
      Object.assign(node, {
        previous: nodes[index === 0 ? nodes.length - 1 : index - 1],
        next: nodes[(index + 1) % nodes.length],
      })
    );
  for (const node of nodes) node.value *= 811589153;
  for (let n = 0; n < 10; n++) mix(nodes);
  const { x, y, z } = findGroveCoordinates(nodes);
  return x + y + z;
}
