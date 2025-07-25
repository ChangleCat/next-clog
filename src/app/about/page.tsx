import fs from "fs";

import { compileMdx } from "@/utils/mdx";

export default async function AboutPage() {
    const content = fs.readFileSync("content/about.mdx", "utf8");
    const { content: mdxContent } = await compileMdx(content);
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <article className="prose dark:prose-invert">
                <h1 className="pt-16">About</h1>
                <div className="mt-8">
                    {mdxContent}
                </div>
            </article>
        </main>
    );
}