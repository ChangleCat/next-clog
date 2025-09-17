"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/app/loading";
// import { getAllTags } from "@/utils/posts-manager";

// export function generateStaticParams() {
//   const tags = getAllTags().keys();
//   return Array.from(
//     tags.map((tag) => ({
//       tag,
//     }))
//   );
// }

export default function TagsRedirectPage() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // 使用 router.replace() 而不是 router.push()
    // replace 不会在浏览器历史记录中留下重定向前的一页
    // 这意味着用户点击“后退”按钮时，不会回到这个重定向页面
    const tag = path.split("/").at(-1);
    router.replace(`/tags/${tag}/page/1`);
  }, [router, path]);

  // 在重定向生效前，可以显示一个加载状态
  // 这对网速较慢的用户体验更好
  return <Loading />;
}
