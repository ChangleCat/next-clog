import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { walk } from "@/utils/directory-walk";
import { compileMdx } from "@/utils/mdx";


const postsDirectory = path.join(process.cwd(), "content/posts");

// 创建一个映射来存储 slug 和文件路径
const slugMap: Map<string, string> = new Map();
// 遍历 posts 目录，收集所有 .md 和 .mdx 文件的 slug
for (const [dirPath, __, files] of walk(postsDirectory)) {
    const mdFiles = files.filter(file => file.endsWith(".md") || file.endsWith(".mdx"));
    for (const file of mdFiles) {
        slugMap.set(file.replace(/\.mdx?$/, ""), path.join(dirPath, file));
    }
}


//  生成所有可能的 slug
//* 这部分代码会在构建时运行，生成静态参数
export async function generateStaticParams() {
    return Array.from(slugMap.keys()).map((slug) => ({
        slug,
    }))
}

// 根据 slug 获取文章内容
async function getPost(slug: string) {
    const filePath = slugMap.get(slug);
    if (!filePath) {
        throw new Error(`Post not found for slug: ${slug}`);
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);
    return { content, data };
}

// 页面组件
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { content, data } = await getPost(slug);
    const { content: mdxContent } = await compileMdx(content);

    return (
        <main className="max-w-4xl mx-auto px-8 py-8 bg-surface-2 transition-colors duration-200">
            <article className="prose dark:prose-invert">
                <h1 className="pt-16">{data.title}</h1>
                <div className="text-sm text-gray-500">{(data.date as Date).toLocaleDateString()}</div>
                <div className="mt-8">
                    {mdxContent}
                </div>
            </article>
        </main>
    );
}