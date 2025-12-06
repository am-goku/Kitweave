import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12 text-zinc-400">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-4 sm:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600" />
            <span className="text-lg font-bold text-white">KitWeaver</span>
          </div>
          <p className="text-sm">
            The AI-powered React component library for modern web development.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/components" className="hover:text-white">Components</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/showcase" className="hover:text-white">Showcase</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 text-center text-xs text-zinc-600 sm:px-8">
        © 2025 KitWeaver Inc. All rights reserved.
      </div>
    </footer>
  );
}
