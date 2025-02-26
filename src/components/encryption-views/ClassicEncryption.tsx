import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const CLASSIC_METHODS = [
  { value: "caesar", label: "Caesar Cipher", params: ["a"] },
  { value: "affine", label: "Affine Cipher", params: ["a", "b"] },
  { value: "multiplicative", label: "Multiplicative Cipher", params: ["a"] },
  { value: "permutation", label: "Permutation", params: ["m", "pi"] },
  { value: "hill", label: "Hill Cipher", params: ["matrix"] },
  { value: "vigenere", label: "Vigenere Cipher", params: ["key"] },
];

export function ClassicEncryption() {
  return (
    <CryptoSection
      title="Classic Encryption"
      methods={CLASSIC_METHODS}
      onProcess={encryptText}
      actionLabel="Encrypt"
    />
  );
}
