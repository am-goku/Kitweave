import { Button } from "@/components/ui/button";
import { HeroSection } from "../components/landing/hero";
import { MagicCard } from "../components/ui/magic-card";


export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />
      
      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Everything you need to build faster
          </h2>
          <p className="text-zinc-400">
            Premium components, intelligent generation, and seamless integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MagicCard className="p-8 h-64 border-zinc-800 bg-zinc-900/50">
            <div className="mb-4 h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/><line x1="3.27" y1="6.96" x2="12" y2="12.01"/><line x1="20.73" y1="6.96" x2="12" y2="12.01"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Component Generator</h3>
            <p className="text-zinc-400">
              Describe your component and watch it gain life. Llama 3.1 powered engine.
            </p>
          </MagicCard>

          <MagicCard className="p-8 h-64 border-zinc-800 bg-zinc-900/50">
            <div className="mb-4 h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Interactive Fixes</h3>
            <p className="text-zinc-400">
              Paste broken code and get instant suggestions directly in the browser.
            </p>
          </MagicCard>

          <MagicCard className="p-8 h-64 border-zinc-800 bg-zinc-900/50">
            <div className="mb-4 h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Docs That Teach</h3>
            <p className="text-zinc-400">
              Learn best practices with interactive playgrounds and live previews.
            </p>
          </MagicCard>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-linear-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building beautiful apps with KitWeaver.
            Get started today for free.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
