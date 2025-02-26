import { DecryptSection } from "../DecryptSection";
import { decryptText } from "@/lib/cryptography";

const CLASSIC_METHODS = [
  { value: "caesar", label: "Caesar Cipher (Bruteforce)" },
  { value: "affine", label: "Affine Cipher (Bruteforce)" },
  { value: "multiplicative", label: "Multiplicative Cipher (Bruteforce)" },
  { value: "permutation", label: "Permutation", params: ["m"] },
  { value: "hill", label: "Hill Cipher", params: ["matrix"] },
  { value: "vigenere", label: "Vigenere Cipher", params: ["key"] },
];

export function ClassicDecryption() {
  return <DecryptSection methods={CLASSIC_METHODS} />;
}
