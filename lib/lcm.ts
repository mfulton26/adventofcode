import gcd from "@lib/gcd.ts";

export default function lcm(a: number, b: number) {
  return a * b / gcd(a, b);
}
