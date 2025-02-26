import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ClipboardCopy } from "lucide-react";

interface Method {
  value: string;
  label: string;
  params?: string[];
  paramOptions?: {
    [key: string]: string[];
  };
  paramPlaceholders?: {
    [key: string]: string;
  };
}

interface CryptoSectionProps {
  title: string;
  methods: Method[];
  onProcess: (text: string, method: string, params: Record<string, string>) => Promise<string>;
  actionLabel: string;
}

export function CryptoSection({ title, methods, onProcess, actionLabel }: CryptoSectionProps) {
  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("");
  const [outputText, setOutputText] = useState("");
  const [params, setParams] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const { toast } = useToast();

  const selectedMethod = methods.find(m => m.value === method);

  const handleParamChange = (param: string, value: string) => {
    setParams(prev => ({ ...prev, [param]: value }));
  };

  const handleProcess = async () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to process",
        variant: "destructive",
      });
      return;
    }
    if (!method) {
      toast({
        title: "Error",
        description: "Please select a method",
        variant: "destructive",
      });
      return;
    }

    if (selectedMethod && selectedMethod.params && selectedMethod.params.some(param => !params[param])) {
      toast({
        title: "Error",
        description: "Please fill in all required parameters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await onProcess(inputText, method, params);
      if (result.startsWith('Error')) {
        throw new Error(result);
      }
      setOutputText(result);
      toast({
        title: "Success",
        description: "Text processed successfully",
      });
    } catch (error) {
      console.error('Process error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process text",
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
      <h2 className="text-2xl font-bold text-crypto-accent">{title}</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder={`Enter text to ${actionLabel.toLowerCase()}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        
        <Select value={method} onValueChange={(value) => {
          setMethod(value);
          setParams({});
        }}>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${actionLabel.toLowerCase()} method`} />
          </SelectTrigger>
          <SelectContent>
            {methods.map((method) => (
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
                {param === "matrix" ? (
                  <Textarea
                    value={params[param] || ""}
                    onChange={(e) => handleParamChange(param, e.target.value)}
                    placeholder="Enter matrix elements separated by spaces and rows by newlines (e.g., '[2 1, 1 3]')"
                    className="font-mono"
                  />
                ) : selectedMethod.paramOptions?.[param] ? (
                  <Select
                    value={params[param] || ""}
                    onValueChange={(value) => handleParamChange(param, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={selectedMethod.paramPlaceholders?.[param] || `Select ${param}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedMethod.paramOptions[param].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    value={params[param] || ""}
                    onChange={(e) => handleParamChange(param, e.target.value)}
                    placeholder={selectedMethod.paramPlaceholders?.[param] || `Enter ${param}`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={handleProcess}
          className="w-full bg-crypto-accent hover:bg-crypto-accent/90"
          disabled={isLoading}
        >
          {isLoading ? `${actionLabel}ing...` : actionLabel}
        </Button>

        {outputText && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <div className="relative">
              <Textarea
                value={outputText}
                readOnly
                className="font-mono min-h-[100px] whitespace-pre-wrap p-4 bg-muted"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 hover:bg-background/50"
                onClick={handleCopy}
                disabled={isCopying}
              >
                <ClipboardCopy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
