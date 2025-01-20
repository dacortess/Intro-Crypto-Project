import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { encryptText } from "@/lib/cryptography";

const ENCRYPTION_METHODS = [
  { value: "caesar", label: "Caesar Cipher", params: ["a"] },
  { value: "affine", label: "Affine Cipher", params: ["a", "b"] },
  { value: "multiplicative", label: "Multiplicative Cipher", params: ["a"] },
  { value: "rsa", label: "RSA", params: ["a", "b", "n"] },
  { value: "permutation", label: "Permutation", params: ["m", "pi"] },
];

export function EncryptSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const selectedMethod = ENCRYPTION_METHODS.find(m => m.value === method);

  const handleParamChange = (param: string, value: string) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const handleEncrypt = async () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to encrypt",
        variant: "destructive",
      });
      return;
    }
    if (!method) {
      toast({
        title: "Error",
        description: "Please select an encryption method",
        variant: "destructive",
      });
      return;
    }

    // Check if all required parameters are filled
    if (selectedMethod && selectedMethod.params.some(param => !params[param])) {
      toast({
        title: "Error",
        description: "Please fill in all required parameters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await encryptText(inputText, method, params);
      setOutputText(result);
      toast({
        title: "Success",
        description: "Text encrypted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt text",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-crypto-accent">Encrypt Text</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Enter text to encrypt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        
        <Select value={method} onValueChange={(value) => {
          setMethod(value);
          setParams({}); // Reset params when method changes
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Select encryption method" />
          </SelectTrigger>
          <SelectContent>
            {ENCRYPTION_METHODS.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedMethod && (
          <div className="grid grid-cols-2 gap-4">
            {selectedMethod.params.map((param) => (
              <div key={param} className="space-y-2">
                <label className="text-sm font-medium">
                  Parameter {param.toUpperCase()}
                </label>
                <Input
                  type="number"
                  placeholder={`Enter ${param}`}
                  value={params[param] || ""}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={handleEncrypt}
          className="w-full bg-crypto-accent hover:bg-crypto-accent/90"
          disabled={isLoading}
        >
          {isLoading ? "Encrypting..." : "Encrypt"}
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