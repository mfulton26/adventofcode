/** delegates to Node.js until https://github.com/denoland/deno/issues/17171 is fixed */
export default async function solve(input: string) {
  const command = new Deno.Command("node", {
    args: [`${import.meta.dirname}/solve.mts`],
    stdin: "piped",
    stdout: "piped",
  });

  const child = command.spawn();
  const writer = child.stdin.getWriter();
  await writer.write(new TextEncoder().encode(input));
  writer.releaseLock();
  await child.stdin.close();

  const { stdout } = await child.output();
  return +new TextDecoder().decode(stdout);
}
