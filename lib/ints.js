export default function* ints({ first, last, step = 1 }) {
  for (let value = first; value <= last; value += step) yield value;
}
