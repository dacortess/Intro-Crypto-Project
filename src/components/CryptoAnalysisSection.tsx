import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { analyzeText } from "@/lib/cryptography";

const ANALYSIS_METHODS = [
  { value: "hill", label: "Hill Cipher (Coincidence Index)" },
  { value: "vigenere", label: "Vigenère Cipher (Coincidence Index)" },
];

interface PossibleWord {
  word: string;
  key: string;
}

interface AnalysisResult {
  possibleWords: PossibleWord[];
  mostProbable: string;
}

export function CryptoAnalysisSection() {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState<AnalysisResult | null>(null);
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
      try {
        // Parse the response which is in format [[["word","key"],...], "mostProbable"]
        const parsedData = JSON.parse(result);
        const [possibleWordsList, mostProbable] = parsedData;
        
        const formattedResult: AnalysisResult = {
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