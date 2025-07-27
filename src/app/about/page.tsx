import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";

export default async function AboutPage() {
    const content = fs.readFileSync("content/about.mdx", "utf8");
    const { content: mdxContent } = await compileMdx(content);
    return (
        <main className="max-w-4xl mx-auto px-4 py-8 bg-surface-2">
            <article className="prose dark:prose-invert">
                <h1 className="pt-16">About</h1>
                <div className="mt-8">
                    {mdxContent}
                </div>
            </article>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "关于",
    description: "想了解「常乐凯特」和「人偶使の小屋」？点进来看看吧...",
  }
}