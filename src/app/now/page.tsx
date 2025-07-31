import fs from "fs";

import { compileMdx } from "@/utils/mdx";
import { Metadata } from "next";
import AuthorCard from "@/components/AuthorCard";

export default async function NowPage() {
    const content = fs.readFileSync("content/now.mdx", "utf8");
    const { content: mdxContent, frontmatter } = await compileMdx(content);
    return (
        <main className='max-w-7xl mx-auto flex gap-8 mt-24'>
            <div className="card-base flex-1 p-8 transition-colors duration-200 hover:border-border">
                <article className="prose dark:prose-invert">
                    <div className="mt-8">
                        {mdxContent}
                    </div>
                </article>
            </div>
            <aside>
                <AuthorCard className='p-8' />
            </aside>
        </main>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "如今",
        description: "想了解「常乐凯特」最近(?存疑)在干什么？点进来看看吧...",
    }
}