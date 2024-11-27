import { crypto } from "jsr:@std/crypto@1.0.3";
import { encodeHex } from "jsr:@std/encoding@1.0.5/hex";

const textEncoder = new TextEncoder();

export default function md5(input: string) {
  const data = textEncoder.encode(input);
  return encodeHex(crypto.subtle.digestSync("MD5", data));
}
