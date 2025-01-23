import { Lock, Unlock, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeSection: "encrypt" | "decrypt" | "analysis";
  onSectionChange: (section: "encrypt" | "decrypt" | "analysis") => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const items = [
    {
      title: "Encrypt",
      value: "encrypt",
      icon: Lock,
    },
    {
      title: "Decrypt",
      value: "decrypt",
      icon: Unlock,
    },
    {
      title: "Analysis",
      value: "analysis",
      icon: Search,
    },
  ];

  return (
    <nav className="h-full bg-background">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Cryptography
          </h2>
          <div className="space-y-1">
            {items.map((item) => (
              <button
                key={item.title}
                onClick={() => onSectionChange(item.value as "encrypt" | "decrypt" | "analysis")}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}