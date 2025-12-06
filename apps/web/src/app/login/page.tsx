import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "../../components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-black bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black text-white px-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Welcome back
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Password</Label>
            <Input id="password" type="password" className="bg-zinc-900/50 border-zinc-700 text-white focus-visible:ring-indigo-500" />
          </div>
          <Button className="w-full bg-white text-black hover:bg-zinc-200">
            Sign In with Email
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
             <Button variant="outline" className="w-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white">
              GitHub
            </Button>
            <Button variant="outline" className="w-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white">
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm text-zinc-500">
          <Link href="/register" className="hover:text-white transition-colors">
            Don&apos;t have an account? Sign up
          </Link>
          <Link href="/" className="hover:text-white transition-colors text-xs">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
