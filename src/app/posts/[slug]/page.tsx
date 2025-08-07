import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/utils/posts-manager";
import AuthorCard from '@/components/side/AuthorCard';
import AnnouncementCard from '@/components/side/Announcement';
import { Icon } from '@iconify/react/dist/iconify.js';

//  生成所有可能的 slug
//* 这部分代码会在构建时运行，生成静态参数
export async function generateStaticParams() {
	return getAllPostSlugs();
}

type IconAndContent = {
	type: "author" | "wordCount" | "readingTime" | "date"
	icon: string;
	content: string | number;
}

type PostMetadata = IconAndContent[];

//  页面组件函数
export default async function PostPage({ params }: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params;

	const post = getPostBySlug(slug);
	if (post === undefined) {
		notFound();
	}

	const { content, frontmatter } = post;

	const metaData: PostMetadata = [
		{
			type: "author",
			icon: "material-symbols:stylus-fountain-pen",
			content: frontmatter.author ?? "Changle_cat"
		},
		{
			type: "wordCount",
			icon: "mdi:file-word",
			content: frontmatter.wordCount
		},
		{
			type: "readingTime",
			icon: "mdi:clock-time-four",
			content: `${Math.round(frontmatter.wordCount / 300)}分钟`
		},
		{
			type: "date",
			icon: "mdi:calendar-month",
			content: frontmatter.date
		}

	]

	return (
		<main className='max-w-7xl mx-auto flex gap-4 mt-24'>
			<div className="card-base flex-1 p-8 transition-colors duration-200 hover:border-border shadow-xl">
				<h1 className="text-5xl">{frontmatter.title as string}</h1>
				<div className='flex gap-4 text-gray-500 mt-4'>
					{metaData.map(value => {
						return (
							<div className='flex items-center ' key={value.type}><Icon icon={value.icon} />{value.content}</div>
						)
					})}
				</div>
				<article className="prose dark:prose-invert">
					<div className="mt-8">
						{content}
					</div>
				</article>
			</div>
			<aside className='w-70 flex flex-col gap-4'>
				<AuthorCard className='p-8' />
				<AnnouncementCard />
			</aside>
		</main>
	);
}

// 元数据生成函数
export async function generateMetadata({ params }: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (post === undefined) {
		notFound()
	}
	const { frontmatter } = post;

	return {
		title: frontmatter.title,
		description: frontmatter.description ?? "",
	}
}