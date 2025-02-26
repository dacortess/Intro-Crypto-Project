import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CryptoAnalysisSection } from "@/components/CryptoAnalysisSection";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Import encryption views
import { ClassicEncryption } from "@/components/encryption-views/ClassicEncryption";
import { SymmetricKeyEncryption } from "@/components/encryption-views/SymmetricKeyEncryption";
import { PublicKeyEncryption } from "@/components/encryption-views/PublicKeyEncryption";
import { DigitalSignature } from "@/components/encryption-views/DigitalSignature";
import { ImageEncryption } from "@/components/encryption-views/ImageEncryption";

// Import decryption views
import { ClassicDecryption } from "@/components/decryption-views/ClassicDecryption";
import { SymmetricKeyDecryption } from "@/components/decryption-views/SymmetricKeyDecryption";
import { PublicKeyDecryption } from "@/components/decryption-views/PublicKeyDecryption";
import { DigitalSignatureVerification } from "@/components/decryption-views/DigitalSignatureVerification";
import { ImageDecryption } from "@/components/decryption-views/ImageDecryption";

const Index = () => {
  const [activeSection, setActiveSection] = useState("encrypt-classic");

  const getSectionTitle = () => {
    const sections: Record<string, string> = {
      "encrypt-classic": "Classic Encryption",
      "encrypt-symmetric": "Symmetric Key Encryption",
      "encrypt-public": "Public Key Encryption",
      "encrypt-signature": "Digital Signature",
      "encrypt-images": "Image Encryption",
      "decrypt-classic": "Classic Decryption",
      "decrypt-symmetric": "Symmetric Key Decryption",
      "decrypt-public": "Public Key Decryption",
      "decrypt-signature": "Digital Signature Verification",
      "decrypt-images": "Image Decryption",
      "analysis": "Cryptographic Analysis"
    };
    return sections[activeSection] || "Cryptography";
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "encrypt-classic":
        return <ClassicEncryption />;
      case "encrypt-symmetric":
        return <SymmetricKeyEncryption />;
      case "encrypt-public":
        return <PublicKeyEncryption />;
      case "encrypt-signature":
        return <DigitalSignature />;
      case "encrypt-images":
        return <ImageEncryption />;
      case "decrypt-classic":
        return <ClassicDecryption />;
      case "decrypt-symmetric":
        return <SymmetricKeyDecryption />;
      case "decrypt-public":
        return <PublicKeyDecryption />;
      case "decrypt-signature":
        return <DigitalSignatureVerification />;
      case "decrypt-images":
        return <ImageDecryption />;
      case "analysis":
        return <CryptoAnalysisSection />;
      default:
        return <ClassicEncryption />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center border-b p-4 h-16">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-4">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-semibold">{getSectionTitle()}</h1>
        </header>

        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 border-r">
            <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          <main className="flex-1 p-6">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;