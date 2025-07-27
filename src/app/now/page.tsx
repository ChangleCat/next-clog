import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";

export default async function NowPage() {
    const content = fs.readFileSync("content/now.mdx", "utf8");
    const { content: mdxContent } = await compileMdx(content);
    return (
        <main className="max-w-4xl mx-auto px-4 py-8 bg-surface-2">
            <article className="prose dark:prose-invert">
                <h1 className="pt-16">Now</h1>
                <div className="mt-8">
                    {mdxContent}
                </div>
            </article>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "如今",
    description: "想了解「常乐凯特」最近(?存疑)在干什么？点进来看看吧...",
  }
}