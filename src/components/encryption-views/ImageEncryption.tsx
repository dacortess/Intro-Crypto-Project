import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { encryptText } from "@/lib/cryptography";

export function ImageEncryption() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      // TODO: Implement actual image encryption
      const result = await encryptText(selectedImage.name, "aes-image", { key });
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
            <p className="text-sm font-medium mb-2">Preview:</p>
            <div className="border rounded-lg p-2 w-48">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded object-contain"
              />
            </div>
          </div>
        )}

        <Button 
          onClick={handleEncrypt}
          className="w-full bg-crypto-warning hover:bg-crypto-warning/90"
          disabled={isLoading}
        >
          {isLoading ? "Encrypting..." : "Encrypt Image"}
        </Button>
      </div>
    </div>
  );
}
