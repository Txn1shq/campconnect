import { MainNav } from "@/components/main-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-64 flex-col">
        <MainNav />
      </div>
      <main className="flex-1 bg-background p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
