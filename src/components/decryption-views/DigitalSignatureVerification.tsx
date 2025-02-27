import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifyFileSignature } from "@/lib/cryptography";
import { CheckCircle2, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setVerificationResult(null);
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to verify",
        variant: "destructive",
      });
      return;
    }

    if (!signature) {
      toast({
        title: "Error",
        description: "Please enter the signature",
        variant: "destructive",
      });
      return;
    }

    if (!publicKey) {
      toast({
        title: "Error",
        description: "Please enter the public key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyFileSignature(selectedFile, signature, publicKey);
      setVerificationResult(result.verification_result);
      
      toast({
        title: "Success",
        description: "File verification completed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify file signature",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="text" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text Verification</TabsTrigger>
        <TabsTrigger value="file">File Verification</TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        <DecryptSection methods={DIGITAL_SIGNATURE_METHODS} />
      </TabsContent>

      <TabsContent value="file" className="space-y-6">
        <h2 className="text-2xl font-bold text-crypto-warning">Verify File Signature</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">File</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Signature</label>
            <Input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Enter the file signature"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Public Key</label>
            <Input
              type="text"
              value={publicKey}
              onChange={(e) => setPublicKey(e.target.value)}
              placeholder="Enter the public key"
            />
          </div>

          <Button
            onClick={handleVerify}
            disabled={!selectedFile || !signature || !publicKey || isLoading}
            className="w-full"
          >
            {isLoading ? "Verifying..." : "Verify File"}
          </Button>

          {verificationResult && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${
              verificationResult === "Signature is valid" 
                ? "bg-green-500/20 text-green-500" 
                : "bg-red-500/20 text-red-500"
            }`}>
              {verificationResult === "Signature is valid" ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Signature is valid</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span>Signature is invalid</span>
                </>
              )}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
