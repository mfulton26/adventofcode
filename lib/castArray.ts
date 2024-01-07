export default function castArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) return value;
  return [value];
}
