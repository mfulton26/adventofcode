import { crypto } from "@std/crypto";
import { encodeHex } from "@std/encoding/hex";

const textEncoder = new TextEncoder();

export default function md5(input: string) {
  const data = textEncoder.encode(input);
  return encodeHex(crypto.subtle.digestSync("MD5", data));
}
