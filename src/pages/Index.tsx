import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { EncryptSection } from "@/components/EncryptSection";
import { DecryptSection } from "@/components/DecryptSection";
import { CryptoAnalysisSection } from "@/components/CryptoAnalysisSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"encrypt" | "decrypt" | "analysis">("encrypt");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          {activeSection === "encrypt" && <EncryptSection />}
          {activeSection === "decrypt" && <DecryptSection />}
          {activeSection === "analysis" && <CryptoAnalysisSection />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;