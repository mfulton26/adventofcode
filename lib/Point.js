const instancesByHash = new Map();

export default function Point(...coordinates) {
  const hash = `${coordinates}`;
  if (new.target) {
    this.coordinates = coordinates;
    instancesByHash.set(hash, this);
    return this;
  } else {
    return instancesByHash.get(hash) ?? new Point(...coordinates);
  }
}

Point.prototype[Symbol.iterator] = function () {
  return this.coordinates[Symbol.iterator]();
};
