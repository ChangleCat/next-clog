import AuthorCard from "@/components/side/AuthorCard";
import { Banner } from "@/components/Banner";
import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";
import { getPaginatedPosts } from "@/utils/posts-manager";
import AnnouncementCard from "@/components/side/Announcement";

const POSTS_PER_PAGE = 6;

export default async function Home({ searchParams }: {
  searchParams?: Promise<{ page?: string }>
}) {
  const currentPage = Number((await searchParams)?.page) || 1;

  const { posts, totalPages } = getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-4 mt-8" id="main">
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="flex flex-col w-full gap-4">
            {posts.map(post => <Postcard post={post} className="w-full" key={post.slug} />)}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} className="w-full" targetID="scroll-end" currentURL="/"/>
        </div>
        <aside className="flex flex-col gap-4 w-70">
          <AuthorCard className="w-full" />
          <AnnouncementCard className="w-full" />
        </aside>
      </main>
    </>
  );
}
