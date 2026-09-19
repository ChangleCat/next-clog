import AuthorCard from "@/components/side/AuthorCard";
import { Banner } from "@/components/Banner";
import Pagination from "@/components/Pagination";
import Postcard from "@/components/Postcard";
import { getPaginatedPosts } from "@/utils/posts-manager";
import AnnouncementCard from "@/components/side/Announcement";

const POSTS_PER_PAGE = 6;

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(
    1,
    POSTS_PER_PAGE
  );
  return Array.from({length:totalPages}, (_, index)=>({
    index: (index+1).toString()
  }))
}

// Only the generated page numbers exist; out-of-range or non-numeric indices
// 404 instead of rendering an empty page on demand, and the pagination links
// below can no longer be fed a NaN/negative value.
export const dynamicParams = false;

export default async function Home({ params }: {
  params: Promise<{ index: string }>
}) {
  const currentPage = Number((await params).index);

  const { posts, totalPages } = getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE
  );

  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-4 mt-8 md:flex-row flex-col px-4" id="main">
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="flex flex-col w-full gap-4">
            {posts.map(post => <Postcard post={post} className="w-full" key={post.slug} />)}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} className="w-full" targetID="scroll-end" URLTemplate={`/pagination/{index}`}/>
        </div>
        <aside className="flex flex-col gap-4 w-full md:w-auto items-center">
          <AuthorCard className="w-full md:w-70" />
          <AnnouncementCard className="w-full md:w-70" />
        </aside>
      </main>
    </>
  );
}
