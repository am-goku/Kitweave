import { SearchInput } from "@/components/ui/search-input";
import { TagFilter } from "@/components/ui/tag-filter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This is a server component that fetches data
export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams; // Next.js 15 requires awaiting searchParams
  const query = resolvedSearchParams?.query || "";
  const tags = resolvedSearchParams?.tags || "";
  
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.NEXT_PUBLIC_APP_URL || "localhost:3000";
  const apiUrl = `${protocol}://${host}/api/components?query=${query}&tags=${tags}`;

  let components = [];
  try {
     const res = await fetch(apiUrl, { cache: 'no-store' });
     if (res.ok) {
        components = await res.json();
     }
  } catch (err) {
    console.error("Fetch error", err);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Component Library</h1>
        <p className="text-zinc-400">Browse and manage your UI components.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         <SearchInput />
         <TagFilter />
      </div>

      {components.length === 0 ? (
        <div className="py-12 text-center text-zinc-500">
          No components found. Try adjusting your search.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {components.map((component: any) => (
            <Card key={component.id} className="border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{component.name}</CardTitle>
                    {component.isPublic && <Badge variant="secondary" className="text-xs">Public</Badge>}
                </div>
                <CardDescription className="line-clamp-2">{component.description || "No description provided."}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {component.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs border-zinc-800 text-zinc-500">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="rounded-lg bg-zinc-900 p-4 text-xs font-mono text-zinc-300 overflow-hidden h-24 relative">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-900/90" />
                    <pre>{component.code}</pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
