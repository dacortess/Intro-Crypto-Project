import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { encryptText, signFile } from "@/lib/cryptography";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoSection } from "../CryptoSection";

const DIGITAL_SIGNATURE_METHODS = [
  { 
    value: "dsa", 
    label: "DSA", 
    params: ["key_size"],
    paramOptions: {
      key_size: ["1024", "2048", "3072"]
    }
  }
];

export function DigitalSignature() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSignature(null);
      setPublicKey(null);
      setPrivateKey(null);
    }
  };

  const handleSignFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to sign",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await signFile(selectedFile);
      
      setSignature(result.signature);
      setPublicKey(result.publicKey);
      setPrivateKey(result.privateKey);
      
      toast({
        title: "Success",
        description: "File signed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSignature = () => {
    if (!signature || !selectedFile) return;
    
    const blob = new Blob([signature], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile.name}.signature`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Signature downloaded successfully",
    });
  };

  const downloadKeys = () => {
    if (!publicKey || !privateKey || !selectedFile) return;
    
    // Download public key
    const publicBlob = new Blob([publicKey], { type: 'text/plain' });
    const publicUrl = URL.createObjectURL(publicBlob);
    const publicLink = document.createElement('a');
    publicLink.href = publicUrl;
    publicLink.download = `${selectedFile.name}.public.key`;
    document.body.appendChild(publicLink);
    publicLink.click();
    document.body.removeChild(publicLink);
    URL.revokeObjectURL(publicUrl);

    // Download private key
    const privateBlob = new Blob([privateKey], { type: 'text/plain' });
    const privateUrl = URL.createObjectURL(privateBlob);
    const privateLink = document.createElement('a');
    privateLink.href = privateUrl;
    privateLink.download = `${selectedFile.name}.private.key`;
    document.body.appendChild(privateLink);
    privateLink.click();
    document.body.removeChild(privateLink);
    URL.revokeObjectURL(privateUrl);
    
    toast({
      title: "Success",
      description: "Keys downloaded successfully",
    });
  };

  return (
    <Tabs defaultValue="text" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text">Text Signature</TabsTrigger>
        <TabsTrigger value="file">File Signature</TabsTrigger>
      </TabsList>

      <TabsContent value="text">
        <CryptoSection
          title="Digital Signature"
          methods={DIGITAL_SIGNATURE_METHODS}
          onProcess={encryptText}
          actionLabel="Sign"
        />
      </TabsContent>

      <TabsContent value="file" className="space-y-6">
        <h2 className="text-2xl font-bold text-crypto-warning">Sign File</h2>
        
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

          <Button
            onClick={handleSignFile}
            disabled={!selectedFile || isLoading}
            className="w-full"
          >
            {isLoading ? "Signing..." : "Sign File"}
          </Button>

          {signature && publicKey && privateKey && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Signature:</p>
                  <div className="bg-background p-2 rounded">
                    <p className="font-mono text-xs break-all">{signature}</p>
                  </div>
                  <Button
                    onClick={downloadSignature}
                    className="w-full bg-primary/20 hover:bg-primary/30"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Signature
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Public Key:</p>
                  <div className="bg-background p-2 rounded">
                    <p className="font-mono text-xs break-all">{publicKey}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Private Key:</p>
                  <div className="bg-background p-2 rounded">
                    <p className="font-mono text-xs break-all">{privateKey}</p>
                  </div>
                </div>

                <Button
                  onClick={downloadKeys}
                  className="w-full bg-primary/20 hover:bg-primary/30"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Keys
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
