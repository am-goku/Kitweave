'use client';

import { SetStateAction, useEffect, useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { ComponentPreview } from '@/components/docs/component-preview';
import { Textarea } from '@/components/ui/textarea';

export default function GeneratePage() {
    const [prompt, setPrompt] = useState('');

    const { completion, complete, isLoading } = useCompletion({
        api: '/api/ai/generate',
    });

    const handleGenerate = async () => {
        if (!prompt) return;
        await complete(prompt);
    };

    useEffect(() => {
        console.log(completion, isLoading);
    }, [completion, isLoading]);

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
                    <h2 className="text-lg font-semibold">Generated Output</h2>

                    <ComponentPreview name="GeneratedComponent" className="my-0">
                        {completion || '// Generated code will appear here...'}
                    </ComponentPreview>

                    <p className="text-xs text-muted-foreground text-center">
                        * Note: The live preview might not render dynamic AI code perfectly yet. Copy the code to test it.
                    </p>
                </div>
            </div>
        </div>
    );
}
