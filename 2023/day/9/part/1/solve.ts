export default function solve(input: string) {
  const histories = input.split("\n")
    .map((line) => line.split(" ").map(Number));
  return histories.reduce((sum, history) => {
    const sequences = [history];
    while (sequences.at(-1)!.some((value) => value !== 0)) {
      const sequence = sequences.at(-1)!
        .map((value, index, array) => array[index + 1] - value)
        .slice(0, -1);
      sequences.push(sequence);
    }
    sequences.at(-1)!.push(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
      const sequence = sequences.at(i)!;
      sequence.push(sequence.at(-1)! + sequences.at(i + 1)!.at(-1)!);
    }
    return sum + sequences.at(0)!.at(-1)!;
  }, 0);
}
