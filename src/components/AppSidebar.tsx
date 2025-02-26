import { Lock, Unlock, Search } from "lucide-react";
import { useState } from "react";

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<"encrypt" | "decrypt" | null>(null);

  const encryptItems = [
    { title: "Classic", value: "encrypt-classic" },
    { title: "Symmetric Key", value: "encrypt-symmetric" },
    { title: "Public Key", value: "encrypt-public" },
    { title: "Digital Signature", value: "encrypt-signature" },
    { title: "Images", value: "encrypt-images" },
  ];

  const decryptItems = [
    { title: "Classic", value: "decrypt-classic" },
    { title: "Symmetric Key", value: "decrypt-symmetric" },
    { title: "Public Key", value: "decrypt-public" },
    { title: "Digital Signature", value: "decrypt-signature" },
    { title: "Images", value: "decrypt-images" },
  ];

  const handleMainButtonClick = (section: "encrypt" | "decrypt") => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <nav className="h-full bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Cryptography
          </h2>
          <div className="space-y-1">
            {/* Encrypt Section */}
            <div className="space-y-1">
              <button
                onClick={() => handleMainButtonClick("encrypt")}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-muted ${
                  expandedSection === "encrypt" ? "bg-muted" : ""
                }`}
              >
                <Lock className="h-5 w-5" />
                Encrypt
              </button>
              {expandedSection === "encrypt" && (
                <div className="ml-6 space-y-1">
                  {encryptItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => onSectionChange(item.value)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Decrypt Section */}
            <div className="space-y-1">
              <button
                onClick={() => handleMainButtonClick("decrypt")}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-muted ${
                  expandedSection === "decrypt" ? "bg-muted" : ""
                }`}
              >
                <Unlock className="h-5 w-5" />
                Decrypt
              </button>
              {expandedSection === "decrypt" && (
                <div className="ml-6 space-y-1">
                  {decryptItems.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => onSectionChange(item.value)}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.value
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Analysis Section 
            <button
              onClick={() => onSectionChange("analysis")}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeSection === "analysis"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Search className="h-5 w-5" />
              Analysis
            </button>*/}
          </div>
        </div>
      </div>
    </nav>
  );
}