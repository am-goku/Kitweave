'use client';

import { SetStateAction, useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Wand2, Copy, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function GeneratePage() {
    const [prompt, setPrompt] = useState('');
    const [copied, setCopied] = useState(false);

    const { completion, complete, isLoading } = useCompletion({
        api: '/api/ai/generate',
    });

    const handleGenerate = async () => {
        if (!prompt) return;
        await complete(prompt);
    };

    const handleCopy = async () => {
        if (!completion) return;
        await navigator.clipboard.writeText(completion);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container py-8 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Component Generator</h1>
                <p className="text-muted-foreground">
                    Describe the component you want, and our AI will build it for you instantly.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Input Section */}
                <Card className="p-6 h-fit bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Prompt</label>
                            <Textarea
                                placeholder="e.g., A pricing card with a gradient background, checkmarks list, and a glowing CTA button."
                                className="min-h-[200px] resize-none font-mono text-sm"
                                value={prompt}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPrompt(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={handleGenerate}
                            className="w-full"
                            disabled={isLoading || !prompt}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate Component
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Generated Code</h2>
                        {completion && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCopy}
                                className="gap-2"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4" />
                                        Copy Code
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    <div className="relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        {completion ? (
                            <SyntaxHighlighter
                                language="tsx"
                                style={vscDarkPlus}
                                customStyle={{
                                    margin: 0,
                                    padding: '1.5rem',
                                    fontSize: '0.875rem',
                                    maxHeight: '600px',
                                }}
                                showLineNumbers
                            >
                                {completion}
                            </SyntaxHighlighter>
                        ) : (
                            <div className="p-8 text-center text-muted-foreground">
                                <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Generated code will appear here...</p>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        💡 Tip: Copy the code and paste it into your project to see it in action!
                    </p>
                </div>
            </div>
        </div>
    );
}
