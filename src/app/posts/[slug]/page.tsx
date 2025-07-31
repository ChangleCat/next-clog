import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/utils/posts-manager";
import AuthorCard from '@/components/AuthorCard';

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
    if (post === undefined) {
        notFound();
    }

    const { content, frontmatter } = post;

    return (
        <main className='max-w-7xl mx-auto flex gap-8 mt-24'>
            <div className="card-base flex-1 p-8 transition-colors duration-200 hover:border-border">
                <h1 className="text-5xl">{frontmatter.title as string}</h1>
                <article className="prose dark:prose-invert">
                    <div className="text-sm text-gray-500">{(new Date(frontmatter.date as string)).toLocaleDateString()}</div>
                    <div className="mt-8">
                        {content}
                    </div>
                </article>
            </div>
            <aside>
                <AuthorCard className='p-8'/>
            </aside>
        </main>
    );
}

// 元数据生成函数
export async function generateMetadata({ params }: paramsProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (post === undefined) {
        notFound()
    }
    const { frontmatter } = post;

    return {
        title: frontmatter.title + " | 人偶使の小屋",
        description: frontmatter.description as string,
    }
}