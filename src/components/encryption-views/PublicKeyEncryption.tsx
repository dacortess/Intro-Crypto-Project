import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const PUBLIC_KEY_METHODS = [
  { 
    value: "rsa", 
    label: "RSA", 
    params: ["primeP", "primeQ"],
    paramOptions: {
      primeP: ["2", "3", "79", "97", "101", "199", "227", "229", "349", "367"],
      primeQ: ["11", "19", "41", "113", "223", "251", "311", "401", "419"]
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
