"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function BillingPage() {
  const handleUpgrade = async () => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_123", // Mock User ID
          email: "user@example.com", // Mock Email
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Plans</h1>
        <p className="text-zinc-400">Manage your subscription and billing details.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>Perfect for hobbyists.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-zinc-400">/mo</span></div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 3 AI Generations / day</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Public Components</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Community Support</li>
            </ul>
            <Button variant="outline" className="w-full" disabled>Current Plan</Button>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 bg-zinc-950 ring-1 ring-indigo-500/50">
          <CardHeader>
            <CardTitle className="flex justify-between">
              Pro Plan
              <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-xs text-indigo-400">Most Popular</span>
            </CardTitle>
            <CardDescription>For serious developers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold">$9<span className="text-sm font-normal text-zinc-400">/mo</span></div>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Unlimited AI Generations</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Private Component Library</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Priority Support</li>
            </ul>
            <Button onClick={handleUpgrade} className="w-full bg-white text-black hover:bg-zinc-200">Upgrade to Pro</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
