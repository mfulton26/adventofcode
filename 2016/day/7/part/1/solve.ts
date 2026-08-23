const abbaRegExp = /(.)(?!\1)(.)\2\1/;

export function supportsTls(ip: string) {
  const supernets = ip.match(/(?<=^|\])[a-z]+(?=\[|$)/g)!;
  if (!supernets.some((s) => abbaRegExp.test(s))) return false;
  const hypernets = ip.match(/(?<=\[)[a-z]+(?=\])/g)!;
  if (hypernets.some((h) => abbaRegExp.test(h))) return false;
  return true;
}

export default function solve(input: string) {
  let count = 0;
  for (const ip of input.split("\n")) if (supportsTls(ip)) count++;
  return count;
}
