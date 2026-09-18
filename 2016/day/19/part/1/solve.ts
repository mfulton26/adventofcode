export default function solve(input: string) {
  const elfCount = +input;
  let current = new class Elf {
    position = 1;
    next = this;
  }();
  for (let position = 2, tail = current; position <= elfCount; position++) {
    tail = tail.next = { position, next: current };
  }
  while (current.next !== current) current = current.next = current.next.next;
  return current.position;
}
