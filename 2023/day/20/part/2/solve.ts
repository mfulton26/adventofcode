type Pulse = { source: string; type: "low" | "high"; destination: string };

type CommonModuleProps = {
  name: string;
  destinations: string[];
  onPulse?: (pulse: Pulse) => Pulse[];
};
type FlipFlopModule = CommonModuleProps & {
  type: "flip-flop";
  isOn: boolean;
};
type ConjunctionModule = CommonModuleProps & {
  type: "conjunction";
  memory: Map<string, "low" | "high">;
};
type UntypedModule = CommonModuleProps & {
  type?: never;
};
type Module = FlipFlopModule | ConjunctionModule | UntypedModule;

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

function lcm(a: number, b: number) {
  return a * b / gcd(a, b);
}

export default function solve(input: string) {
  const modules = input.split("\n").map<Module>((line) => {
    const [left, right] = line.split(" -> ");
    const destinations = right.split(", ");
    switch (left[0]) {
      case "%":
        return {
          type: "flip-flop",
          name: left.slice(1),
          destinations,
          isOn: false,
          onPulse(input) {
            if (input.type === "high") return [];
            this.isOn = !this.isOn;
            const source = this.name;
            const type = this.isOn ? "high" : "low";
            return this.destinations.map((destination) => ({
              source,
              type,
              destination,
            }));
          },
        };
      case "&":
        return {
          type: "conjunction",
          name: left.slice(1),
          destinations,
          memory: new Map(),
          onPulse(input) {
            this.memory.set(input.source, input.type);
            const source = this.name;
            const type = (() => {
              for (const name of sourcesByName.get(this.name) ?? []) {
                if (this.memory.get(name) === "high") continue;
                return "high";
              }
              return "low";
            })();
            return this.destinations.map((destination) => ({
              source,
              type,
              destination,
            }));
          },
        };
      default:
        return {
          name: "broadcaster",
          destinations,
          onPulse({ type }) {
            const source = this.name;
            return this.destinations.map((destination) => ({
              source,
              type,
              destination,
            }));
          },
        };
    }
  });
  const sourcesByName = new Map<string, Set<string>>();
  for (const { name, destinations } of modules) {
    for (const destination of destinations) {
      if (!sourcesByName.has(destination)) {
        sourcesByName.set(destination, new Set());
      }
      sourcesByName.get(destination)!.add(name);
    }
  }
  const modulesByName = modules.reduce(
    (map, module) => map.set(module.name, module),
    new Map<string, typeof modules[number]>(),
  );
  const rxSources = sourcesByName.get("rx");
  if (rxSources === undefined) throw new Error("rx not found");
  if (rxSources.size !== 1) {
    throw new Error(`expected single source for rx but got ${rxSources}`);
  }
  const [rxSource] = rxSources.values();
  const desired = Array.from(sourcesByName.get(rxSource)!)
    .reduce((map, name) => map.set(name, []), new Map<string, number[]>());
  cycling: for (let n = 0;; n++) {
    const queue: Pulse[] = [
      { source: "button", type: "low", destination: "broadcaster" },
    ];
    processing: while (queue.length) {
      const input = queue.shift()!;
      if (input.type === "high" && desired.has(input.source)) {
        desired.get(input.source)!.push(n);
        for (const trends of desired.values()) {
          if (trends.length < 2) continue processing;
        }
        break cycling;
      }
      const module = modulesByName.get(input.destination);
      if (module === undefined) continue;
      const output = module.onPulse?.(input);
      if (output === undefined) continue;
      queue.push(...output);
    }
  }
  return Array.from(desired.values()).map(([a, b]) => b - a).reduce(lcm);
}
