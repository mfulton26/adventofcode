export default function solve(input: string, { prefix = "departure " } = {}) {
  const { fields, myTicket, nearbyTickets } = parseNotes(input);
  function isValidTicket(ticket: number[]) {
    return ticket.every((value) =>
      fields.some(({ ranges }) =>
        ranges.some(([lower, upper]) => value >= lower && value <= upper)
      )
    );
  }
  const validTickets = [myTicket, ...nearbyTickets.filter(isValidTicket)];
  const fieldIndexes = findFieldIndexes(fields, validTickets);
  return fields
    .filter((field) => field.name.startsWith(prefix))
    .reduce(
      (product, field) => product * myTicket[fieldIndexes.get(field)!],
      1,
    );
}

type Field = { name: string; ranges: number[][] };

function parseNotes(text: string) {
  const [fieldLines, myTicketLines, nearbyTicketLines] = text.split("\n\n");
  const fields = fieldLines.split("\n").map((line) => {
    const [name, rhs] = line.split(": ");
    const ranges = rhs.split(" or ")
      .map((string) => string.split("-").map(Number));
    return <Field> { name, ranges };
  });
  const myTicket = myTicketLines.split("\n")[1].split(",").map(Number);
  const nearbyTickets = nearbyTicketLines.split("\n").slice(1)
    .map((line) => line.split(",").map(Number));
  return { fields, myTicket, nearbyTickets };
}

function findFieldIndexes(fields: Field[], validTickets: number[][]) {
  const fieldIndexCandidates = new Map(
    fields.map((field) => [
      field,
      new Set(Array.from(fields, (_, index) => index)),
    ]),
  );
  for (const validTicket of validTickets) {
    for (let index = 0; index < validTicket.length; index++) {
      const value = validTicket[index];
      for (const [{ ranges }, indexCandidates] of fieldIndexCandidates) {
        if (
          !ranges.some(([lower, upper]) => value >= lower && value <= upper)
        ) {
          indexCandidates.delete(index);
        }
      }
    }
  }
  const fieldIndexes = new Map<Field, number>();
  while (fieldIndexCandidates.size) {
    for (const [field, indexCandidates] of fieldIndexCandidates) {
      if (indexCandidates.size !== 1) continue;
      const [index] = indexCandidates;
      fieldIndexes.set(field, index);
      fieldIndexCandidates.delete(field);
      for (const otherIndexCandidates of fieldIndexCandidates.values()) {
        otherIndexCandidates.delete(index);
      }
    }
  }
  return fieldIndexes;
}
