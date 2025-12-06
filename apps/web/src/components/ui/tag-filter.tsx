"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const AVAILABLE_TAGS = ["Button", "Card", "Input", "Layout", "Animation", "Form"];

export function TagFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const currentTags = searchParams.get("tags")?.split(",") || [];

  const toggleTag = (tag: string) => {
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    const params = new URLSearchParams(searchParams);
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }
    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {AVAILABLE_TAGS.map((tag) => (
        <Badge
          key={tag}
          variant={currentTags.includes(tag) ? "default" : "outline"}
          className={cn(
            "cursor-pointer hover:bg-indigo-500/20",
            currentTags.includes(tag) ? "bg-indigo-500 hover:bg-indigo-600" : "border-zinc-700 text-zinc-400"
          )}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
