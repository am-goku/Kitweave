"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Components", href: "/dashboard/components" },
    { name: "Docs", href: "/docs" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-6 w-6 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600" />
          <span className="text-lg font-bold tracking-tight text-white">
            KitWeaver
          </span>
        </Link>
        <nav className="flex flex-1 items-center gap-6 text-sm font-medium text-zinc-400">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-white",
                pathname === item.href ? "text-white" : ""
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white">
            Login
          </Link>
          <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
