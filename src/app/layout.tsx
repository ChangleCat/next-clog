import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { FontLoader } from "@/components/head/FontLoader";
import TransitionProvider from "@/components/TransitionProvider";
import UniverseParticle from "@/components/UniverseParticle";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <FontLoader />
      </head>
      <body className={`antialiased min-h-[110vh] transition-colors duration-200`}>
        <Header />
        <TransitionProvider>
          {children}
        </TransitionProvider>
        <Footer />
        <UniverseParticle />
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
          default: "人偶使の小屋",
          template: "%s | 人偶使の小屋"
        },
        description: "欢迎来到「人偶使の小屋」，我是屋主「常乐凯特」，这里是我的个人博客，进来看看吧~"
        // TODO: 添加 Open Graph 和 Twitter Card 元数据
    }
}