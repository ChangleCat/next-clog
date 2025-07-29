import { Banner } from "@/components/Banner";
import { Postcard } from "@/components/postcard";
import { cn } from "@/utils/cn";
import { getPaginatedPosts } from "@/utils/posts-manager";
import { IClassName } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

export default async function Home({ searchParams }: {
  searchParams?: Promise<{ page?: string }>
}) {
  const currentPage = Number((await searchParams)?.page) || 1;

  const { posts, totalPages } = getPaginatedPosts(
    currentPage,
    POSTS_PER_PAGE
  );

  const checkHasPreview = (str: string | undefined) => {
    return str !== undefined && str !== ""
  }
  return (
    <>
      <Banner />
      <main className="max-w-7xl flex mx-auto gap-8" id="main">
        <div className="flex-1 flex flex-col items-center">
          <div className="flex flex-col w-full">
            {posts.map(post => <Postcard post={post} className="w-full mt-8" key={post.slug} />)}
          </div>
          <div>

          </div>
        </div>
        <aside>
          <AutherCard className="mt-8 w-70" />
        </aside>
      </main>
    </>
  );
}

type contactDetail = {
  platform: string;
  url: string;
  icon: string;
}

type AutherType = {
  name: string;
  subtext: string;
  avatarURL: string;
  contactDetails: contactDetail[];
}

function AutherCard({ className = "" }: IClassName) {
  const auther: AutherType = {
    name: "Changle_cat",
    subtext: "希腊奶",
    avatarURL: "https://blog-images.s3.bitiful.net/avatar.webp",
    contactDetails: [
      {
        platform: "Home",
        url: "/",
        icon: "carbon:home"
      },
      {
        platform: "Email",
        url: "mailto:cthulhu@changlecat.me",
        icon: "carbon:email"
      },
      {
        platform: "Github",
        url: "https://github.com/ChangleCat",
        icon: "simple-icons:github"
      },
      {
        platform: "Bilibili",
        url: "https://space.bilibili.com/313519315",
        icon: "simple-icons:bilibili"
      }
    ]
  }
  return (
    <div className={cn("card-base flex flex-col items-center py-8 bg-primary text-main-reverse gap-2", className)}>
      <div>
        <Link href="/about">
          <Image
            src={auther.avatarURL}
            width={128}
            height={128}
            className="rounded-full border-4 border-main-reverse hover:rotate-360 hover:scale-105 transition-transform duration-800"
            alt="avatar" />
        </Link>
      </div>
      <div className="font-bold text-xl text-center">{auther.name}</div>
      <div className="opacity-80">{auther.subtext}</div>
      <div className="flex gap-4">
        {auther.contactDetails.map((detail) => {
          return (
            <Link href={detail.url} className="p-2 rounded-xl border-2 border-main-reverse text-main-reverse hover:text-primary hover:bg-surface-2 transition-colors" key={detail.platform}>
              <Icon icon={detail.icon} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}