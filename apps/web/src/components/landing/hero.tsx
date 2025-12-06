"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden pt-24 pb-12 text-center">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
      
      <div className="z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 backdrop-blur-md">
            <span>✨ Introducing KitWeaver AI</span>
          </div>
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Build React Interfaces <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">
              at the speed of thought
            </span>
          </h1>
          <p className="mb-10 max-w-2xl mx-auto text-lg text-zinc-400 sm:text-xl">
            Generate production-ready Shadcn/UI components with a single prompt.
            Customize, iterate, and deploy in seconds.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-lg bg-white text-black hover:bg-zinc-200 rounded-full">
              Start Building Free
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-zinc-800 bg-black/50 text-white hover:bg-zinc-900 rounded-full">
              View Components
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-[-1] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </section>
  );
}
