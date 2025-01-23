import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { EncryptSection } from "@/components/EncryptSection";
import { DecryptSection } from "@/components/DecryptSection";
import { CryptoAnalysisSection } from "@/components/CryptoAnalysisSection";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"encrypt" | "decrypt" | "analysis">("encrypt");

  const getSectionTitle = () => {
    switch (activeSection) {
      case "encrypt":
        return "Encryption";
      case "decrypt":
        return "Decryption";
      case "analysis":
        return "Analysis";
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
          <div className="hidden md:block">
            <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          <main className="flex-1 p-6">
            {activeSection === "encrypt" && <EncryptSection />}
            {activeSection === "decrypt" && <DecryptSection />}
            {activeSection === "analysis" && <CryptoAnalysisSection />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;