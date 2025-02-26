import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const CLASSIC_METHODS = [
  { 
    value: "caesar", 
    label: "Caesar Cipher", 
    params: ["a"],
    paramOptions: {
      a: ["1", "3", "5", "7", "9", "11", "15", "17", "19", "21", "23", "25"]
    },
    paramPlaceholders: {
      a: "Select parameter A"
    }
  },
  { 
    value: "affine", 
    label: "Affine Cipher", 
    params: ["a", "b"],
    paramOptions: {
      a: ["1", "3", "5", "7", "9", "11", "15", "17", "19", "21", "23", "25"],
      b: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"]
    },
    paramPlaceholders: {
      a: "Select parameter A",
      b: "Select parameter B"
    }
  },
  { 
    value: "multiplicative", 
    label: "Multiplicative Cipher", 
    params: ["a"],
    paramOptions: {
      a: ["1", "3", "5", "7", "9", "11", "15", "17", "19", "21", "23", "25"]
    },
    paramPlaceholders: {
      a: "Select parameter A"
    }
  },
  { 
    value: "permutation", 
    label: "Permutation", 
    params: ["m", "pi"]
  },
  { 
    value: "hill", 
    label: "Hill Cipher", 
    params: ["matrix"],
    paramPlaceholders: {
      matrix: "Enter matrix (e.g., [1 2, 3 4]"
    }
  },
  { 
    value: "vigenere", 
    label: "Vigenere Cipher", 
    params: ["key"],
    paramPlaceholders: {
      key: "Enter key text"
    }
  }
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
