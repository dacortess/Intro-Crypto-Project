import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { decryptText } from "@/lib/cryptography";

const DECRYPTION_METHODS = [
  { value: "caesar", label: "Caesar Cipher (Bruteforce)" },
  { value: "affine", label: "Affine Cipher (Bruteforce)" },
  { value: "rsa", label: "RSA (Bruteforce)" },
];

export function DecryptSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDecrypt = async () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to decrypt",
        variant: "destructive",
      });
      return;
    }
    if (!method) {
      toast({
        title: "Error",
        description: "Please select a decryption method",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await decryptText(inputText, method);
      setOutputText(result);
      toast({
        title: "Success",
        description: "Text decrypted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt text",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-crypto-warning">Decrypt Text</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Enter text to decrypt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select decryption method" />
          </SelectTrigger>
          <SelectContent>
            {DECRYPTION_METHODS.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleDecrypt}
          className="w-full bg-crypto-warning hover:bg-crypto-warning/90"
          disabled={isLoading}
        >
          {isLoading ? "Decrypting..." : "Decrypt"}
        </Button>

        {outputText && (
          <Textarea
            value={outputText}
            readOnly
            className="min-h-[200px] font-mono bg-muted"
          />
        )}
      </div>
    </div>
  );
}