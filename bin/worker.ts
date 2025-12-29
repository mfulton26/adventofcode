/// <reference lib="deno.worker" />

import { getSolveFn } from "@lib/harness.ts";

export interface InputData {
  input: string;
  moduleName: string;
}

export interface OutputData {
  key: "answer" | "error";
  value: unknown;
}

self.onmessage = async (
  { data: { input, moduleName } }: MessageEvent<InputData>,
) => {
  try {
    const solve = await getSolveFn(`.${moduleName}`);
    if (solve === undefined) {
      throw Error(`no default exported function found in ${moduleName}`);
    }
    const answer = await solve(input);
    self.postMessage({ key: "answer", value: answer } satisfies OutputData);
  } catch (error) {
    self.postMessage({ key: "error", value: error } satisfies OutputData);
  }
};
