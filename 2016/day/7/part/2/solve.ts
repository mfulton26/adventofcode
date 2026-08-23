const abaRegExp = /(?=(.)(?!\1)(.)\1)/g;

function abaExecs(nets: string[]) {
  return nets[Symbol.iterator]().flatMap((s) => s.matchAll(abaRegExp));
}

export function supportsSsl(ip: string) {
  const supernets = ip.match(/(?<=^|\])[a-z]+(?=\[|$)/g)!;
  const set = new Set(abaExecs(supernets).map(([, a, b]) => a + b));
  const hypernets = ip.match(/(?<=\[)[a-z]+(?=\])/g)!;
  return abaExecs(hypernets).map(([, b, a]) => a + b).some((ab) => set.has(ab));
}

export default function solve(input: string) {
  let count = 0;
  for (const ip of input.split("\n")) if (supportsSsl(ip)) count++;
  return count;
}
