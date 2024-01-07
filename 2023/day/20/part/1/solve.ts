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
  const counts = { "low": 0, "high": 0 };
  for (let n = 0; n < 1000; n++) {
    const queue: Pulse[] = [
      { source: "button", type: "low", destination: "broadcaster" },
    ];
    while (queue.length) {
      const input = queue.shift()!;
      counts[input.type]++;
      const module = modulesByName.get(input.destination);
      if (module === undefined) continue;
      const output = module.onPulse?.(input);
      if (output === undefined) continue;
      queue.push(...output);
    }
  }
  return counts.low * counts.high;
}
