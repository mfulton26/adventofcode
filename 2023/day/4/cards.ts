export function parse(text: string) {
  return text.split("\n").map((line) => {
    const [prefix, data] = line.split(/: +/);
    const id = Number(prefix.match(/\d+/)![0]);
    const [winningNumbersText, numbersYouHaveText] = data.split(/ +\| +/);
    const winningNumbers = new Set(winningNumbersText.split(/ +/).map(Number));
    const numbersYouHave = new Set(numbersYouHaveText.split(/ +/).map(Number));
    return { id, winningNumbers, numbersYouHave };
  });
}
