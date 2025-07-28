import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/utils/posts-manager";

//  生成所有可能的 slug
//* 这部分代码会在构建时运行，生成静态参数
export async function generateStaticParams() {
    return getAllPostSlugs();
}


interface paramsProps {
    params: Promise<{ slug: string }>
}

//  页面组件函数
export default async function PostPage({ params }: paramsProps) {
    const { slug } = await params;

    const post = getPostBySlug(slug);
    if(post === undefined){
        notFound();
    }

    const { content, frontmatter } = post;

    return (
        <main className="max-w-4xl mx-auto px-8 py-8 bg-surface-2 transition-colors duration-200">
            <h1 className="pt-16 text-5xl">{frontmatter.title as string}</h1>
            <article className="prose dark:prose-invert">
                <div className="text-sm text-gray-500">{(new Date(frontmatter.date as string)).toLocaleDateString()}</div>
                <div className="mt-8">
                    {content}
                </div>
            </article>
        </main>
    );
}

// 元数据生成函数
export async function generateMetadata({ params } : paramsProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if(post===undefined){
    notFound()
  }
  const { frontmatter } = post;
 
  return {
    title: frontmatter.title + " | 人偶使の小屋",
    description: frontmatter.description as string,
  }
}