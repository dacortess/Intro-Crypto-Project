import { DecryptSection } from "../DecryptSection";
import { decryptText } from "@/lib/cryptography";

const DIGITAL_SIGNATURE_METHODS = [
  { 
    value: "dsa", 
    label: "Validate DSA", 
    params: ["signature", "publicKey"],
    paramPlaceholders: {
      signature: "Enter Base64 encoded signature",
      publicKey: "Enter Base64 encoded public key"
    },
    paramWarnings: {
      signature: "Must be Base64 encoded",
      publicKey: "Must be Base64 encoded"
    },
    inputWarning: "Input text must be Base64 encoded"
  }
];

export function DigitalSignatureVerification() {
  return <DecryptSection methods={DIGITAL_SIGNATURE_METHODS} />;
}
