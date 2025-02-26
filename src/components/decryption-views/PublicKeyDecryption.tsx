import { DecryptSection } from "../DecryptSection";
import { decryptText } from "@/lib/cryptography";

const PUBLIC_KEY_METHODS = [
  { 
    value: "rsa", 
    label: "RSA", 
    params: ["n", "b"],
    paramPlaceholders: {
      n: "Enter parameter N",
      b: "Enter parameter B"
    }
  },
  { 
    value: "elgammal", 
    label: "ElGammal", 
    params: ["privateKey"],
    paramPlaceholders: {
      privateKey: "Enter Base64 encoded private key"
    },
    paramWarnings: {
      privateKey: "Must be Base64 encoded"
    },
    inputWarning: "Input text must be Base64 encoded"
  }
];

export function PublicKeyDecryption() {
  return <DecryptSection methods={PUBLIC_KEY_METHODS} />;
}
