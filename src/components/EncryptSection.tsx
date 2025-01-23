import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { encryptText } from "@/lib/cryptography";
import { ClipboardCopy } from "lucide-react";

const ENCRYPTION_METHODS = [
  { value: "caesar", label: "Caesar Cipher", params: ["a"] },
  { value: "affine", label: "Affine Cipher", params: ["a", "b"] },
  { value: "multiplicative", label: "Multiplicative Cipher", params: ["a"] },
  { value: "rsa", label: "RSA", params: ["p", "q"] },
  { value: "permutation", label: "Permutation", params: ["m", "pi"] },
];

const PARAM_OPTIONS = {
  caesar: {
    a: Array.from({ length: 25 }, (_, i) => (i + 1).toString()),
  },
  affine: {
    a: Array.from({ length: 25 }, (_, i) => (i + 1).toString()).filter(n => n !== "13" && parseInt(n) % 2 !== 0),
    b: Array.from({ length: 25 }, (_, i) => (i + 1).toString()),
  },
  multiplicative: {
    a: Array.from({ length: 25 }, (_, i) => (i + 1).toString()).filter(n => n !== "13" && parseInt(n) % 2 !== 0),
  },
  rsa: {
    p: ["2", "3", "79", "97", "101", "199", "227", "229", "349", "367"],
    q: ["11", "19", "41", "113", "223", "251", "311", "401", "419"],
  },
};

export function EncryptSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
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

  const handleCopy = async () => {
    if (!outputText) return;
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    } finally {
      setIsCopying(false);
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
          <div className="space-y-2">
            {selectedMethod.params.map((param) => (
              <div key={param} className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Parameter {param.toUpperCase()}
                </label>
                {method === "permutation" && param === "m" ? (
                  <Input
                    type="number"
                    value={params[param] || ""}
                    onChange={(e) => handleParamChange(param, e.target.value)}
                    placeholder={`Enter the length of the permutation (e.g., 4)`}
                  />
                ) : method === "permutation" && param === "pi" ? (
                  <Input
                    value={params[param] || ""}
                    onChange={(e) => handleParamChange(param, e.target.value)}
                    placeholder="Enter numbers separated by spaces (e.g., 3 0 2 1)"
                  />
                ) : (
                  <Select
                    value={params[param] || ""}
                    onValueChange={(value) => handleParamChange(param, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select parameter ${param}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {PARAM_OPTIONS[method as keyof typeof PARAM_OPTIONS][param as "a" | "b"].map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
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
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[200px] font-mono bg-muted"
              />
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 shrink-0"
                  onClick={handleCopy}
                  disabled={isCopying}
                >
                  <ClipboardCopy className="h-5 w-5" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
                <span className="text-xs text-muted-foreground text-center w-full">
                  {isCopying ? "Copying..." : "Copy text"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}