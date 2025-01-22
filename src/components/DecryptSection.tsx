import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { decryptText } from "@/lib/cryptography";

const DECRYPTION_METHODS = [
  { value: "caesar", label: "Caesar Cipher (Bruteforce)" },
  { value: "affine", label: "Affine Cipher (Bruteforce)" },
  { value: "multiplicative", label: "Multiplicative Cipher (Bruteforce)" },
  { value: "rsa", label: "RSA", params: ["n", "pk"] },
  { value: "permutation", label: "Permutation", params: ["m"] },
];

interface PossibleWord {
  word: string;
  key: string;
}

interface DecryptionResult {
  possibleWords: PossibleWord[];
  mostProbable: string;
}

export function DecryptSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [outputText, setOutputText] = useState<DecryptionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const selectedMethod = DECRYPTION_METHODS.find(m => m.value === method);

  const handleParamChange = (param: string, value: string) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

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

    // Check if all required parameters are filled
    if (selectedMethod?.params && selectedMethod.params.some(param => !params[param])) {
      toast({
        title: "Error",
        description: "Please fill in all required parameters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await decryptText(inputText, method, params);
      try {
        // Parse the response which is in format [[["word","key"],...], "mostProbable"]
        const parsedData = JSON.parse(result);
        const [possibleWordsList, mostProbable] = parsedData;
        
        const formattedResult: DecryptionResult = {
          possibleWords: possibleWordsList.map(([word, key]: [string, string]) => ({
            word,
            key
          })),
          mostProbable
        };
        
        setOutputText(formattedResult);
      } catch (parseError) {
        // If parsing fails, treat it as a simple string result
        setOutputText({
          possibleWords: [],
          mostProbable: result
        });
      }
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
        
        <Select value={method} onValueChange={(value) => {
          setMethod(value);
          setParams({}); // Reset params when method changes
        }}>
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

        {selectedMethod?.params && (
          <div className="space-y-2">
            {selectedMethod.params.map((param) => (
              <div key={param} className="space-y-2">
                <label className="text-sm font-medium">
                  Parameter {param.toUpperCase()}
                </label>
                <Input
                  type="text"
                  value={params[param] || ""}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  placeholder={`Enter ${param}`}
                />
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={handleDecrypt}
          className="w-full bg-crypto-warning hover:bg-crypto-warning/90"
          disabled={isLoading}
        >
          {isLoading ? "Decrypting..." : "Decrypt"}
        </Button>

        {outputText && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Result:</h3>
              <p className="font-mono whitespace-pre-wrap">{outputText.mostProbable}</p>
            </div>
            
            {outputText.possibleWords && outputText.possibleWords.length > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-2">All Possible Results:</h3>
                <div className="space-y-1">
                  {outputText.possibleWords.map(({ word, key }, index) => (
                    <div key={index} className="flex items-center gap-4 font-mono">
                      <span className="flex-1">{word}</span>
                      <span className="text-sm text-muted-foreground">Key: {key}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}