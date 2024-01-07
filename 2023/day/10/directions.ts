export const north = {
  x: 0,
  y: 1,
  get opposite() {
    return south;
  },
} as const;

export const south = {
  x: 0,
  y: -1,
  get opposite() {
    return north;
  },
} as const;

export const east = {
  x: 1,
  y: 0,
  get opposite() {
    return west;
  },
} as const;

export const west = {
  x: -1,
  y: 0,
  get opposite() {
    return east;
  },
} as const;

const directions = Object.freeze([north, south, east, west] as const);

export type Direction = typeof directions[number];

export default directions;
