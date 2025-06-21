import { MainNav } from "@/components/main-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainNav />
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </SidebarProvider>
  );
}
