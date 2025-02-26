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
      key: "Enter key",
      IV: "Enter Base64 encoded initialization vector",
      mode: "Select mode"
    },
    paramWarnings: {
      IV: "Must be Base64 encoded (not required in ECB mode)"
    },
    inputWarning: "Input text must be Base64 encoded"
  },
  { 
    value: "des", 
    label: "DES", 
    params: ["key", "IV", "mode"],
    paramOptions: {
      mode: ["CBC", "CFB", "OFB", "CTR", "ECB"]
    },
    paramPlaceholders: {
      key: "Enter key",
      IV: "Enter Base64 encoded initialization vector ",
      mode: "Select mode"
    },
    paramWarnings: {
      IV: "Must be Base64 encoded (not required in ECB mode)"
    },
    inputWarning: "Input text must be Base64 encoded"
  },
];

export function SymmetricKeyDecryption() {
  return <DecryptSection methods={SYMMETRIC_METHODS} />;
}
