import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { encryptImage } from "@/lib/cryptography";
import { Download } from "lucide-react";

export function ImageEncryption() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iv, setIv] = useState<string | null>(null);
  const [encryptedImageUrl, setEncryptedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setIv(null); // Reset IV when new image is selected
      setEncryptedImageUrl(null); // Reset encrypted image URL

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!encryptedImageUrl || !selectedImage) return;
    
    const link = document.createElement('a');
    link.href = encryptedImageUrl;
    link.download = `encrypted_${selectedImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Encrypted image downloaded successfully",
    });
  };

  const handleEncrypt = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image to encrypt",
        variant: "destructive",
      });
      return;
    }

    if (!key) {
      toast({
        title: "Error",
        description: "Please enter an encryption key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await encryptImage(selectedImage, key);
      
      // Store the encrypted image URL and IV
      setEncryptedImageUrl(result.encrypted_image_url);
      setIv(result.iv);
      
      toast({
        title: "Success",
        description: "Image encrypted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-crypto-warning">Encrypt Image</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter encryption key"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
          </div>
        </div>

        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-md rounded-lg border border-border"
            />
          </div>
        )}

        <Button
          onClick={handleEncrypt}
          disabled={!selectedImage || !key || isLoading}
          className="w-full"
        >
          {isLoading ? "Encrypting..." : "Encrypt Image"}
        </Button>

        {encryptedImageUrl && (
          <Button
            onClick={handleDownload}
            className="w-full bg-primary/20 hover:bg-primary/30"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Encrypted Image
          </Button>
        )}

        {iv && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">Initialization Vector (IV):</p>
            <p className="font-mono text-sm break-all">{iv}</p>
          </div>
        )}
      </div>
    </div>
  );
}
