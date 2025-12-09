'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Plus } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Variant {
    id: string;
    name: string;
    description?: string;
    code: string;
    isDefault: boolean;
}

interface Component {
    id: string;
    name: string;
    description?: string;
    code: string;
    tags: string[];
    variants: Variant[];
}

export default function ComponentDetailPage() {
    const params = useParams();
    const [component, setComponent] = useState<Component | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [copied, setCopied] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch component
                const compRes = await fetch(`/api/components/${params.id}`);
                const compData = await compRes.json();
                setComponent(compData);

                // Fetch variants
                const varRes = await fetch(`/api/components/${params.id}/variants`);
                const varData = await varRes.json();
                setVariants(varData);
            } catch (error) {
                console.error('Failed to fetch component:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [params.id]);

    const handleCopy = async (code: string, id: string) => {
        await navigator.clipboard.writeText(code);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    if (loading) {
        return (
            <div className="container py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
                </div>
            </div>
        );
    }

    if (!component) {
        return (
            <div className="container py-8">
                <p className="text-muted-foreground">Component not found</p>
            </div>
        );
    }

    const allVariants = [
        { id: 'default', name: 'Default', code: component.code, isDefault: true },
        ...variants,
    ];

    return (
        <div className="container py-8 space-y-8">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">{component.name}</h1>
                        {component.description && (
                            <p className="text-muted-foreground">{component.description}</p>
                        )}
                    </div>
                    <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Variant
                    </Button>
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    {component.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Variants */}
            <Card className="p-6">
                <Tabs defaultValue={allVariants[0]?.id || 'default'}>
                    <TabsList className="mb-4">
                        {allVariants.map((variant) => (
                            <TabsTrigger key={variant.id} value={variant.id}>
                                {variant.name}
                                {variant.isDefault && (
                                    <Badge variant="outline" className="ml-2 text-xs">
                                        Default
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {allVariants.map((variant) => (
                        <TabsContent key={variant.id} value={variant.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{variant.name}</h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCopy(variant.code, variant.id)}
                                >
                                    {copied === variant.id ? (
                                        <>
                                            <Check className="h-4 w-4 mr-2" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy Code
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="rounded-lg overflow-hidden border">
                                <SyntaxHighlighter
                                    language="tsx"
                                    style={vscDarkPlus}
                                    customStyle={{
                                        margin: 0,
                                        padding: '1.5rem',
                                        fontSize: '0.875rem',
                                        maxHeight: '500px',
                                    }}
                                    showLineNumbers
                                >
                                    {variant.code}
                                </SyntaxHighlighter>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </Card>
        </div>
    );
}
