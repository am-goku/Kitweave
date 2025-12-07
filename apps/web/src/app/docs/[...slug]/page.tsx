import { getDocBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

// Correct prop typing for Next.js 15
interface PageProps {
  params: Promise<{
     slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const doc = await getDocBySlug(resolvedParams.slug);
  if (!doc) {
    return {
      title: 'Not Found',
    };
  }
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const doc = await getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const { content, frontmatter } = doc;

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <h1 className="mb-2">{frontmatter.title}</h1>
      {frontmatter.description && (
        <p className="text-xl text-zinc-500 dark:text-zinc-400">
          {frontmatter.description}
        </p>
      )}
      <hr className="my-6 border-zinc-200 dark:border-zinc-800" />
      {content}
    </article>
  );
}
