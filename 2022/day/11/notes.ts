const regExp =
  /Monkey (?<id>\d+):\n {2}Starting items: (?<startingItems>.*?)\n {2}Operation: (?<operation>.*?)\n {2}Test: divisible by (?<divisibleBy>\d+)\n {4}If true: throw to monkey (?<throwIfTrueId>\d+)\n {4}If false: throw to monkey (?<throwIfFalseId>\d+)/;

export function parse(text: string) {
  const monkeys = text.split("\n\n").map((noteText, index) => {
    const {
      id: idText,
      startingItems: startingItemsText,
      operation: operationText,
      divisibleBy: divisibleByText,
      throwIfTrueId: throwIfTrueIdText,
      throwIfFalseId: throwIfFalseIdText,
    } = regExp.exec(noteText)!.groups!;
    const id = Number(idText);
    if (id !== index) {
      throw new RangeError("Input should be ordered starting with zero");
    }
    const startingItems = startingItemsText.split(", ").map(BigInt);
    const operation = Function(
      "old",
      operationText.replace(/^new =/, "return").replaceAll(/(\d+)/g, "$1n"),
    ) as (old: bigint) => bigint;
    const divisibleBy = BigInt(divisibleByText);
    const throwIfTrueId = Number(throwIfTrueIdText);
    const throwIfFalseId = Number(throwIfFalseIdText);
    return {
      id,
      startingItems,
      operation,
      divisibleBy,
      throwIfTrueId,
      throwIfFalseId,
    };
  });
  return { monkeys };
}
