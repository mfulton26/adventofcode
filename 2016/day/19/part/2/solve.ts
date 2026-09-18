export default function solve(input: string) {
  let elfCount = +input;
  let current = new class Elf {
    position = 1;
    next = this;
  }();
  let beforeAcross = current;
  for (let position = 2, tail = current; position <= elfCount; position++) {
    tail = tail.next = { position, next: current };
    if (position === elfCount >> 1) beforeAcross = tail;
  }
  for (; elfCount > 1; elfCount--) {
    beforeAcross.next = beforeAcross.next.next;
    current = current.next;
    if ((elfCount - 1) % 2 === 0) beforeAcross = beforeAcross.next;
  }
  return current.position;
}
