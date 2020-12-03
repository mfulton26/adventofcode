export default class Signals {
  /** @type {Map<string, number>} */
  #signals = new Map();

  constructor(connections) {
    this.connections = connections;
  }

  /**
   * @param {string} identifier
   * @returns {number=}
   */
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
