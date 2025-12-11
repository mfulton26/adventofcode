export function parseDevices(text: string) {
  return text.split("\n").reduce((map, line) => {
    const [source, outputsText] = line.split(": ");
    const outputs = new Set(outputsText.split(" "));
    return map.set(source, outputs);
  }, new Map<string, Set<string>>());
}
