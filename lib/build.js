const build = Symbol();

Object.defineProperty(Map, build, {
  value(generator) {
    const result = new Map();
    for (const [key, value] of generator()) result.set(key, value);
    return result;
  },
});

export default build;
