import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/mdx-components";

// Define the root content directory
const contentDir = path.join(process.cwd(), "content/docs");

export async function getDocBySlug(slug: string[]) {
    const realSlug = slug.join("/");
    const filePath = path.join(contentDir, `${realSlug}.mdx`);

    // Fallback for root index
    if (!fs.existsSync(filePath)) {
        if (realSlug === "introduction") {
            // handle edge case if needed, but assuming files exist
        }
        return null;
    }

    const source = fs.readFileSync(filePath, "utf8");

    const { content, frontmatter } = await compileMDX<{ title: string; description: string }>({
        source,
        components: mdxComponents({}),
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-dark",
                            keepBackground: false,
                        }
                    ]
                ],
            },
        },
    });

    return { content, frontmatter, slug: realSlug };
}

export async function getAllDocs() {
    // A simple recursive function could go here to build the sidebar
    // For MVP, we'll manually list them or just scan flat
    const files = fs.readdirSync(contentDir);
    return files.map(file => file.replace(".mdx", ""));
}
