import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Navbar />
      <div className="container mx-auto flex flex-1 gap-8 px-4 py-8 sm:px-8 pt-20">
        <aside className="hidden w-64 flex-col gap-4 md:flex">
          <Sidebar />
        </aside>
        <main className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
