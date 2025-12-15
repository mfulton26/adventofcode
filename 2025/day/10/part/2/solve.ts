export default async function solve(input: string) {
  const { href: workerUrl } = new URL("./worker.ts", import.meta.url);
  const worker = new Worker(workerUrl, { type: "module" });
  try {
    const { promise, resolve } = Promise.withResolvers<number>();
    worker.onmessage = ({ data }) => resolve(data);
    worker.postMessage(input);
    return await promise;
  } finally {
    worker.terminate();
  }
}
