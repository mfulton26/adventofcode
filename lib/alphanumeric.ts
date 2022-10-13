export function alphanumericalCompareFn(a: string, b: string): number {
  const aIterator = a.matchAll(/\d+/g);
  const bIterator = b.matchAll(/\d+/g);
  let aStart = 0, bStart = 0;
  for (
    let aResult = aIterator.next(), bResult = bIterator.next();
    !aResult.done && !bResult.done;
    aResult = aIterator.next(), bResult = bIterator.next()
  ) {
    const { value: { index: aEnd, 0: aDigits } } = aResult;
    const { value: { index: bEnd, 0: bDigits } } = bResult;
    for (; aStart < aEnd! && bStart < bEnd!; aStart++, bStart++) {
      const m = a[aStart], n = b[bStart];
      if (m !== n) return m < n ? -1 : 1;
    }
    const m = BigInt(aDigits), n = BigInt(bDigits);
    if (m !== n) return m < n ? -1 : 1;
    aStart += aDigits.length, bStart += bDigits.length;
  }
  for (; aStart < a.length && bStart < b.length; aStart++, bStart++) {
    const m = a[aStart], n = b[bStart];
    if (m !== n) return m < n ? -1 : 1;
  }
  return a.length - b.length;
}
