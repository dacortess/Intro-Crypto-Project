import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const PUBLIC_KEY_METHODS = [
  { 
    value: "rsa", 
    label: "RSA", 
    params: ["primeP", "primeQ"],
    paramPlaceholders: {
      primeP: "Enter prime number P",
      primeQ: "Enter prime number Q"
    }
  },
  { 
    value: "elgammal", 
    label: "ElGammal", 
    params: ["keySize"],
    paramOptions: {
      keySize: ["1024", "2048"]
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
