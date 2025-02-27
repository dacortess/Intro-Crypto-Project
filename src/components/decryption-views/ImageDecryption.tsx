import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { decryptImage } from "@/lib/cryptography";
import { Download } from "lucide-react";

export function ImageDecryption() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [decryptedImageUrl, setDecryptedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setDecryptedImageUrl(null); // Reset decrypted image URL

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!decryptedImageUrl || !selectedImage) return;
    
    const link = document.createElement('a');
    link.href = decryptedImageUrl;
    link.download = `decrypted_${selectedImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Decrypted image downloaded successfully",
    });
  };

  const handleDecrypt = async () => {
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image to decrypt",
        variant: "destructive",
      });
      return;
    }

    if (!key) {
      toast({
        title: "Error",
        description: "Please enter a decryption key",
        variant: "destructive",
      });
      return;
    }

    if (!iv) {
      toast({
        title: "Error",
        description: "Please enter the initialization vector (IV)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await decryptImage(selectedImage, key, iv);
      
      // Store the decrypted image URL
      setDecryptedImageUrl(result.decrypted_image_url);
      
      toast({
        title: "Success",
        description: "Image decrypted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt image",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-crypto-warning">Decrypt Image</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Key</label>
          <Input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter decryption key"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Initialization Vector (IV)</label>
          <Input
            type="text"
            value={iv}
            onChange={(e) => setIv(e.target.value)}
            placeholder="Enter the IV used for encryption"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Encrypted Image</label>
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
          onClick={handleDecrypt}
          disabled={!selectedImage || !key || !iv || isLoading}
          className="w-full"
        >
          {isLoading ? "Decrypting..." : "Decrypt Image"}
        </Button>

        {decryptedImageUrl && (
          <Button
            onClick={handleDownload}
            className="w-full bg-primary/20 hover:bg-primary/30"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Decrypted Image
          </Button>
        )}
      </div>
    </div>
  );
}
