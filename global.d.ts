interface Map<K, V> {
  getOrInsert(key: K, defaultValue: V): V;
  getOrInsertComputed(key: K, callback: (key: K) => V): V;
}
