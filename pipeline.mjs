/**
 * @param {Array<(value: any) => any>} steps
 */
export default function pipeline(...steps) {
  return function (/** @type {any} */ value) {
    for (const step of steps) {
      value = step(value);
    }
    return value;
  };
}

/**
 * @param {() => Generator<(value: any) => any>} stepsFn
 */
export function generate(stepsFn) {
  return function (/** @type {any} */ value) {
    for (const step of stepsFn()) {
      value = step(value);
    }
    return value;
  };
}
