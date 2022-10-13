export default function solve(input: string) {
  const [cardPublicKey, doorPublicKey] = input.split("\n").map(Number);
  const cardLoopSize = findLoopSize(cardPublicKey);
  return transform(doorPublicKey, { loopSize: cardLoopSize });
}

function findLoopSize(publicKey: number) {
  let value = 1;
  for (let n = 1;; n++) {
    value *= 7;
    value %= 20201227;
    if (value === publicKey) return n;
  }
}

function transform(subjectNumber: number, { loopSize }: { loopSize: number }) {
  let value = 1;
  for (let n = 1; n <= loopSize; n++) {
    value *= subjectNumber;
    value %= 20201227;
  }
  return value;
}
