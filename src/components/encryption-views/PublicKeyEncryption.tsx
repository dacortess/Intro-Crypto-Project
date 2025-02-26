import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const PUBLIC_KEY_METHODS = [
  { 
    value: "rsa", 
    label: "RSA", 
    params: ["primeP", "primeQ"],
    paramOptions: {
      primeP: ["2", "3", "5", "7", "11", "13", "17", "19", "23", "29", "31", "37", "41", "43", "47", "53", "59", "61", "67", "71", "73", "79", "83", "89", "97"],
      primeQ: ["2", "3", "5", "7", "11", "13", "17", "19", "23", "29", "31", "37", "41", "43", "47", "53", "59", "61", "67", "71", "73", "79", "83", "89", "97"]
    },
    paramPlaceholders: {
      primeP: "Select prime number P",
      primeQ: "Select prime number Q"
    }
  },
  { 
    value: "elgamal", 
    label: "ElGammal", 
    params: ["key_size"],
    paramOptions: {
      key_size: ["1024", "2048"]
    },
    paramPlaceholders: {
      key_size: "Select key size"
    }
  }
];

export function PublicKeyEncryption() {
  return (
    <CryptoSection
      title="Public Key Encryption"
      methods={PUBLIC_KEY_METHODS}
      onProcess={encryptText}
      actionLabel="Encrypt"
    />
  );
}
