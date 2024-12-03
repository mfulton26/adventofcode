export function parseNumbers(text: string) {
  const { 0: left = [], 1: right = [] } = Object.groupBy(
    text.split(/\s+/).map(Number),
    (_, index) => index % 2,
  );
  return { left, right };
}
