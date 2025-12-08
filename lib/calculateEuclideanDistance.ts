export default function calculateEuclideanDistance(
  a: readonly number[],
  b: readonly number[],
) {
  return Math.hypot(...a.keys().map((index) => a[index] - b[index]));
}
