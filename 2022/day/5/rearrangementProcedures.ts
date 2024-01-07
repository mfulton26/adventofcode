const regexp =
  /^move (?<quantityText>\d+) from (?<source>\d+) to (?<destination>\d+)$/gm;

export function* parseRearrangementProcedures(text: string) {
  for (const [, quantityText, source, destination] of text.matchAll(regexp)) {
    yield { quantity: parseInt(quantityText), source, destination };
  }
}
