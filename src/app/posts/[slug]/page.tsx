import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/utils/posts-manager";
import AuthorCard from '@/components/side/AuthorCard';
import AnnouncementCard from '@/components/side/Announcement';
import { Icon } from '@iconify/react/dist/iconify.js';
import LicenseCard from '@/components/LicenseCard';
import TableOfContents from '@/components/side/TableOfContents';
import ArtalkComment from '@/components/ArtalkComment';

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

	const metaData = [
		{
			type: "author",
			icon: "material-symbols:stylus-fountain-pen",
			content: (frontmatter.author as string) ?? "Changle_cat"
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
	] satisfies PostMetadata;

	return (
		<main className='max-w-7xl mx-auto flex gap-4 mt-24 flex-col md:flex-row md:px-4'>
			<div className="card-base flex-1 md:p-8 px-4 transition-colors duration-200 hover:border-border shadow-xl md:bg-surface-2 bg-surface-1 border-none md:border-solid">
				<h1 className="text-3xl md:text-4xl lg:text-5xl">{frontmatter.title as string}</h1>
				<div className='flex md:gap-4 gap-2 text-gray-500 mt-4 md:flex-row flex-col'>
					{metaData.map(value => {
						return (
							<div className='flex items-center gap-1' key={value.type}><Icon icon={value.icon} />{value.content}</div>
						)
					})}
				</div>
				<article className="prose dark:prose-invert">
					<div className="mt-8">
						{content}
					</div>
					<LicenseCard 
						className="md:bg-surface-1 bg-surface-2"
						author={metaData[0].content as string}
					/>
				</article>
				<ArtalkComment className="mt-8"/>
			</div>
			<aside className="flex flex-col gap-4 w-full md:w-auto items-center px-4 md:px-0">
				<AuthorCard className="w-full md:w-70" />
				<AnnouncementCard className="w-full md:w-70" />
				<TableOfContents className="w-full md:w-70"/>
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