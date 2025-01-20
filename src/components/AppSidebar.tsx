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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Cryptography</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={activeSection === item.value ? "bg-primary" : ""}
                    onClick={() => onSectionChange(item.value as "encrypt" | "decrypt" | "analysis")}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}