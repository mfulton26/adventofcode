export default function pipeline(
  /** @type {Array<(value: any) => any>} */ ...steps
) {
  return function (/** @type {any} */ value) {
    for (const step of steps) {
      value = step(value);
    }
    return value;
  };
}

export function generate(
  /** @type {() => Generator<(value: any) => any>} */ stepsFn
) {
  return function (/** @type {any} */ value) {
    for (const step of stepsFn()) {
      value = step(value);
    }
    return value;
  };
}
