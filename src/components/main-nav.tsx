"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  MessageCircle,
  Search,
  Store,
  User,
  Sparkles,
  Aperture,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/feed", icon: LayoutGrid, label: "Feed" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/market", icon: Store, label: "Market" },
  { href: "/suggestions", icon: Sparkles, label: "Suggestions" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Aperture className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold text-primary">CampusConnect</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
