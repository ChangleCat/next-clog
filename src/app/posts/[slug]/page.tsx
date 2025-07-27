import fs from "fs";
import path from "path";
import { walk } from "@/utils/directory-walk";
import { compileMdx } from "@/utils/mdx";
import type { Metadata } from 'next';

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

// 
async function getPost(slug: string) {
    const filePath = slugMap.get(slug);
    if (!filePath) {
        throw new Error(`Post not found for slug: ${slug}`);
    }
    const fileContents = fs.readFileSync(filePath, "utf8");
    // 直接将完整的文件内容传递给 compileMdx
    const { content, frontmatter } = await compileMdx(fileContents);
    // 返回编译后的内容和 frontmatter
    return { mdxContent: content, data: frontmatter };
}

interface paramsProps {
    params: Promise<{ slug: string }>
}

//  页面组件函数
export default async function PostPage({ params }: paramsProps) {
    const { slug } = await params;
    // getPost 现在直接返回编译后的 mdxContent 和元数据 data
    const { mdxContent, data } = await getPost(slug);

    return (
        <main className="max-w-4xl mx-auto px-8 py-8 bg-surface-2 transition-colors duration-200">
            <article className="prose dark:prose-invert">
                <h1 className="pt-16">{data.title as string}</h1>
                <div className="text-sm text-gray-500">{(new Date(data.date as string)).toLocaleDateString()}</div>
                <div className="mt-8">
                    {mdxContent}
                </div>
            </article>
        </main>
    );
}

// 元数据生成函数
export async function generateMetadata({ params } : paramsProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getPost(slug);
 
  return {
    title: data.title + " | 人偶使の小屋",
    description: data.description as string,
  }
}