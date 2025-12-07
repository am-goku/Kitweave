import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";
import { ComponentPreview } from "@/components/docs/component-preview";

export function mdxComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn("leading-7 not-first:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic *:text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          className
        )}
        {...props}
      />
    ),
    align: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={cn("text-center", className)} {...props} />
    ),
    ComponentPreview,
    ...components,
  };
};
