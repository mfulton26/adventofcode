function mix(secret: bigint, value: bigint) {
  return value ^ secret;
}

function prune(secret: bigint) {
  return secret % 16777216n;
}

export function generateSecrets(initialSecret: number, { limit = 2000 } = {}) {
  const result: number[] = [];
  let secret = BigInt(initialSecret);
  for (let n = 1; n <= limit; n++) {
    secret = prune(mix(secret, secret * 64n));
    secret = prune(mix(secret, secret / 32n));
    secret = prune(mix(secret, secret * 2048n));
    result.push(Number(secret));
  }
  return result;
}
