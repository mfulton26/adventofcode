const regExp = /(.)((?!\1).)((?!\1)(?!\2).)((?!\1)(?!\2)(?!\3).)/;

export default function solve(input: string) {
  const { index, 0: { length } } = regExp.exec(input)!;
  return index + length;
}
