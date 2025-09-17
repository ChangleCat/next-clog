'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

export default function PostsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // 使用 router.replace() 而不是 router.push()
    // replace 不会在浏览器历史记录中留下重定向前的一页
    // 这意味着用户点击“后退”按钮时，不会回到这个重定向页面
    router.replace('/posts/page/1');
  }, [router]);

  // 在重定向生效前，可以显示一个加载状态
  // 这对网速较慢的用户体验更好
  return <Loading />;
}