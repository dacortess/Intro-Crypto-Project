import { DecryptSection } from "../DecryptSection";
import { decryptText } from "@/lib/cryptography";

const SYMMETRIC_METHODS = [
  { 
    value: "aes", 
    label: "AES", 
    params: ["key", "IV", "mode"],
    paramOptions: {
      mode: ["CBC", "CFB", "OFB", "CTR", "ECB"]
    },
    paramPlaceholders: {
      key: "Enter Base64 encoded key",
      IV: "Enter Base64 encoded initialization vector",
      mode: "Select mode"
    },
    paramWarnings: {
      key: "Must be Base64 encoded",
      IV: "Must be Base64 encoded"
    },
    inputWarning: "Input text must be Base64 encoded"
  },
  { 
    value: "des", 
    label: "DES", 
    params: ["key", "mode"],
    paramOptions: {
      mode: ["CBC", "CFB", "OFB", "CTR", "ECB"]
    },
    paramPlaceholders: {
      key: "Enter Base64 encoded key",
      mode: "Select mode"
    },
    paramWarnings: {
      key: "Must be Base64 encoded"
    },
    inputWarning: "Input text must be Base64 encoded"
  },
];

export function SymmetricKeyDecryption() {
  return <DecryptSection methods={SYMMETRIC_METHODS} />;
}
