export default class BitArray extends Array {
  toNumber() {
    return Number(`0b${this.join("")}`);
  }
}
