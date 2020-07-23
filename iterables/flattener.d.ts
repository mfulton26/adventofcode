// https://stackoverflow.com/questions/63053897/is-there-a-better-or-an-easier-way-to-correctly-infer-a-nested-generic-type

type IterableType<T extends Iterable<any>> = T extends Iterable<infer U>
  ? U
  : never;

export function flatten<T extends Iterable<Iterable<any>>>(
  iterables: T
): IterableIterator<IterableType<IterableType<T>>>;
