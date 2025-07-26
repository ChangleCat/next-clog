import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { FontLoader } from "@/components/head/FontLoader";
import TransitionProvider from "@/components/TransitionProvider";

export const metadata: Metadata = {
  title: "人偶使の小屋",
  description: "常乐凯特的个人博客！",
  // TODO: 添加 Open Graph 和 Twitter Card 元数据
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <FontLoader />
      </head>
      <body className={`antialiased min-h-[110vh] transition-colors duration-200`}>
        <Header />
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}

