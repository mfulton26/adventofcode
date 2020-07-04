export function* split(
  /** @type {string} */ string,
  /** @type {RegExp} */ separator
) {
  let index = 0;
  for (const match of string.matchAll(separator)) {
    if (match.index) {
      yield string.substring(index, match.index);
      index = match.index + match[0].length;
    }
  }
  if (index < string.length) {
    yield string.substring(index);
  }
}
