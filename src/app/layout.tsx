import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { FontLoader } from "@/components/head/FontLoader";
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
      <body className={`antialiased transition-colors duration-200 flex flex-col justify-between min-h-svh`}>
        <Header />
        {children}
        <Footer className="mt-4 self-center max-w-7xl w-full"/>
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
    description: "欢迎来到「人偶使の小屋」，我是屋主「常乐凯特」，这里是我的个人博客，进来看看吧~",
    // TODO: 添加 Open Graph 和 Twitter Card 元数据
  }
}

export const viewport : Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false
}
