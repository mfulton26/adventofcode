export default class Signals {
  #signals = new Map();

  constructor(connections) {
    this.connections = connections;
  }

  get(identifier) {
    if (!isNaN(identifier)) {
      return Number(identifier);
    }
    if (!this.#signals.has(identifier)) {
      this.#signals.set(identifier, this.connections.get(identifier)(this));
    }
    return this.#signals.get(identifier);
  }

  reset() {
    this.#signals.clear();
  }
}
