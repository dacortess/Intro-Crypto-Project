import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { analyzeText } from "@/lib/cryptography";

const ANALYSIS_METHODS = [
  { value: "multiplicative", label: "Multiplicative (Coincidence Index)" },
  { value: "permutation", label: "Permutation (Coincidence Index)" },
];

export function CryptoAnalysisSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to analyze",
        variant: "destructive",
      });
      return;
    }
    if (!method) {
      toast({
        title: "Error",
        description: "Please select an analysis method",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeText(inputText, method);
      setOutputText(result);
      toast({
        title: "Success",
        description: "Text analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze text",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-crypto-success">Crypto Analysis</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder="Enter text to analyze..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select analysis method" />
          </SelectTrigger>
          <SelectContent>
            {ANALYSIS_METHODS.map((method) => (
              <SelectItem key={method.value} value={method.value}>
                {method.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          onClick={handleAnalyze}
          className="w-full bg-crypto-success hover:bg-crypto-success/90"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze"}
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