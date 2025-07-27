import { Metadata } from "next";
import { title } from "process";

export default function PostsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose dark:prose-invert">
        aaa
      </article>
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "文章归档",
    description: "「人偶使の小屋」的文章归档页面"
  }
}