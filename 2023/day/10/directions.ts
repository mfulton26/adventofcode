export type Direction = Readonly<{ x: number; y: number; opposite: Direction }>;

type North = { x: 0; y: 1; opposite: South };
type South = { x: 0; y: -1; opposite: North };
type East = { x: 1; y: 0; opposite: West };
type West = { x: -1; y: 0; opposite: East };
type Directions =
  & readonly [North, South, East, West]
  & Readonly<{ north: North; south: South; east: East; west: West }>;

const north: North = Object.freeze({
  x: 0,
  y: 1,
  get opposite() {
    return south;
  },
});

const south: South = Object.freeze({
  x: 0,
  y: -1,
  get opposite() {
    return north;
  },
});

const east: East = Object.freeze({
  x: 1,
  y: 0,
  get opposite() {
    return west;
  },
});

const west: West = Object.freeze({
  x: -1,
  y: 0,
  get opposite() {
    return east;
  },
});

const directions: Directions = Object.freeze(Object.assign(
  [north, south, east, west] as const,
  { north, south, east, west },
));

export default directions;
