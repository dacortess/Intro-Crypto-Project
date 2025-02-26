import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const SYMMETRIC_METHODS = [
  { 
    value: "aes", 
    label: "AES", 
    params: ["key", "mode"],
    paramOptions: {
      mode: ["CBC", "CFB", "OFB", "CTR", "ECB"]
    },
    paramPlaceholders: {
      key: "Enter key",
      mode: "Select mode"
    }
  },
  { 
    value: "des", 
    label: "DES", 
    params: ["key", "mode"],
    paramOptions: {
      mode: ["CBC", "CFB", "OFB", "CTR", "ECB"]
    },
    paramPlaceholders: {
      key: "Enter key",
      mode: "Select mode"
    }
  },
];

export function SymmetricKeyEncryption() {
  return (
    <CryptoSection
      title="Symmetric Key Encryption"
      methods={SYMMETRIC_METHODS}
      onProcess={encryptText}
      actionLabel="Encrypt"
    />
  );
}
