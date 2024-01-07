export default class DiscontinuousRange {
  constructor();
  constructor(number: number);
  constructor(start: number, end: number);
  constructor(range: DiscontinuousRange);

  length: number;

  add(number: number): DiscontinuousRange;
  add(start: number, end: number): DiscontinuousRange;
  add(range: DiscontinuousRange): DiscontinuousRange;

  subtract(number: number): DiscontinuousRange;
  subtract(start: number, end: number): DiscontinuousRange;
  subtract(range: DiscontinuousRange): DiscontinuousRange;

  index(index: number): number | null;

  toString(): string;

  clone(): DiscontinuousRange;
}
