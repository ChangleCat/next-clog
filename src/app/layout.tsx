import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { FontLoader } from "@/components/head/FontLoader";

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
      <body className={`antialiased`}>
        <div >
          <Banner />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

