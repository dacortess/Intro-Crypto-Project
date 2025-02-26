import { CryptoSection } from "../CryptoSection";
import { encryptText } from "@/lib/cryptography";

const DIGITAL_SIGNATURE_METHODS = [
  { 
    value: "dsa", 
    label: "DSA", 
    params: ["keySize"],
    paramOptions: {
      keySize: ["1024", "2048", "3072"]
    }
  }
];

export function DigitalSignature() {
  return (
    <CryptoSection
      title="Digital Signature"
      methods={DIGITAL_SIGNATURE_METHODS}
      onProcess={encryptText}
      actionLabel="Sign"
    />
  );
}
