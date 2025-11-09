import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/utils/posts-manager";
import AuthorCard from '@/components/side/AuthorCard';
import AnnouncementCard from '@/components/side/Announcement';
import { Icon } from '@iconify/react/dist/iconify.js';
import LicenseCard from '@/components/LicenseCard';
import TableOfContents from '@/components/side/TableOfContents';
import { ArticleLayout } from '@/layouts/index';

export async function generateStaticParams() {
  return getAllPostSlugs();
}

type IconAndContent = {
  type: "author" | "wordCount" | "readingTime" | "date"
  icon: string;
  content: string | number;
}

type PostMetadata = IconAndContent[];

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
    <ArticleLayout
      header={
        <>
          <h1 className="text-3xl md:text-4xl lg:text-5xl">{frontmatter.title as string}</h1>
          <div className='flex md:gap-4 gap-2 text-gray-500 mt-4 md:flex-row flex-col'>
            {metaData.map(value => (
              <div className='flex items-center gap-1' key={value.type}>
                <Icon icon={value.icon} />{value.content}
              </div>
            ))}
          </div>
        </>
      }
      footer={
        <LicenseCard
          className="md:bg-surface-1 bg-surface-2"
          author={metaData[0].content as string}
        />
      }
      sidebar={
        <>
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
          <TableOfContents className="w-full md:w-70" />
        </>
      }
    >
      {content}
    </ArticleLayout>
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
		robots: {
			index: frontmatter.noRobot !== true,
			follow: frontmatter.noRobot !== true
		}
	}
}