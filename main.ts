import { serve } from "https://deno.land/std@0.149.0/http/server.ts";

import { bundle } from "https://deno.land/x/emit@0.9.0/mod.ts";

const solverCode = await (async () => {
  const { code } = await bundle("./www/solver.ts");
  return code.replace(/^const\s+importMeta\s*=\s*\{$[\s\S]*?^\};$\s*?^/m, "")
    .replaceAll(/\bimportMeta\b/g, "import.meta");
})();

const unimplementedSolveCode = /* JavaScript */ `\
export default function solve() { throw new Error("unimplemented"); }
`;

const urlPatterns = new Map<
  URLPattern,
  (result: URLPatternResult) => Promise<
    | Record<string, (result: URLPatternResult) => Promise<BodyInit>>
    | null
  >
>()
  .set(
    new URLPattern({ pathname: "/solver.js" }),
    // deno-lint-ignore require-await
    async () => ({ GET: async () => solverCode }),
  )
  .set(
    new URLPattern({ pathname: "/:year/day/:day/part/:part/solve.js" }),
    async ({ pathname: { groups: { year, day, part } } }) => {
      const root = `./${year}/day/${day}/part/${part}/solve.ts`;
      try {
        await Deno.lstat(root);
      } catch {
        return null;
      }
      return {
        GET: async () => {
          const { code } = await bundle(root);
          return code;
        },
      };
    },
  );

serve(async (request) => {
  try {
    for (const [urlPattern, createResource] of urlPatterns) {
      const result = urlPattern.exec(request.url);
      if (result === null) continue;
      const resource = await createResource(result);
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": resource
          ? Object.keys(resource).join()
          : "GET,OPTIONS",
        "Content-Type": "text/javascript",
      };
      if (resource === null) {
        return new Response(unimplementedSolveCode, { headers });
      }
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          statusText: "No Content",
          headers,
        });
      }
      if (!Object.hasOwn(resource, request.method)) {
        return new Response(null, {
          status: 405,
          statusText: "Method Not Allowed",
        });
      }
      const { [request.method]: handler } = resource;
      return new Response(await handler(result), { headers });
    }
    return new Response(null, { status: 404, statusText: "Not Found" });
  } catch (e) {
    try {
      console.error("failed to handle request", e);
    } finally {
      console.error("failed to handle request and failed to log exception");
    }
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
});
