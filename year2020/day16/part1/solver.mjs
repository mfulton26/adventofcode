export function solve(input) {
  const { fields, nearbyTickets } = parseNotes(input);
  return findErrorRate(fields, nearbyTickets);
}

function parseNotes(text) {
  const [fieldLines, myTicketLines, nearbyTicketLines] = text.split("\n\n");
  const fields = fieldLines.split("\n").map((line) => {
    const [name, rhs] = line.split(": ");
    const ranges = rhs
      .split(" or ")
      .map((string) => string.split("-").map(Number));
    return { name, ranges };
  });
  const myTicket = myTicketLines.split("\n")[1].split(",").map(Number);
  const nearbyTickets = nearbyTicketLines
    .split("\n")
    .slice(1)
    .map((line) => line.split(",").map(Number));
  return { fields, myTicket, nearbyTickets };
}

function findErrorRate(fields, nearbyTickets) {
  let errorRate = 0;
  for (const nearbyTicket of nearbyTickets) {
    for (const value of nearbyTicket) {
      if (
        !fields.some(({ ranges }) =>
          ranges.some(([lower, upper]) => value >= lower && value <= upper)
        )
      ) {
        errorRate += value;
      }
    }
  }
  return errorRate;
}
