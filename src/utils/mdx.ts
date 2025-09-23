import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// 导入所有默认支持的 MDX 组件
import NoteCard from "@/components/shortcodes/note-card";
import { Timeline, TimelineItem } from "@/components/shortcodes/timeline";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import { HightlightMathExpression } from "@/components/shortcodes/TemporaryComponents";
import { GitHubCard } from "@/components/shortcodes/GitHubCard";
import rehypeExternalLinks from "rehype-external-links";

const externalLinkAppend = {
  type: 'element', 
  tagName: 'svg', 
  properties: {
    "class": "inline",
    "xmlns":"http://www.w3.org/2000/svg",
    "width":16,
    "height":16,
    "viewBox":"0 0 24 24"
  },
  children: [{
     type: 'element', 
     tagName: "path",
     properties: {
       "fill":"currentColor",
       "d":"M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
     }
    }]
} 

/**
 * 编译 MDX 源码的封装函数，带有默认配置。
 * @param source - MDX 文本内容。
 * @param config - 可选的额外配置，用于覆盖或添加默认配置。
 * @returns 编译后的 MDX 内容和 frontmatter。
 */
export async function compileMdx(
  source: string,
  config: Partial<MDXRemoteProps> = {}
) {
  const { components: customComponents, options: customOptions } = config;

  // 1. 合并组件
  // 将默认组件与调用时传入的自定义组件合并
  // 如果有同名组件，自定义组件会覆盖默认组件
  const finalComponents = {
    NoteCard,
    Timeline,
    TimelineItem,
    Image,
    HightlightMathExpression,
    GitHubCard,
    ...customComponents,
  };

  // 3. 构建最终的编译配置
  const finalOptions: MDXRemoteProps = {
    source,
    components: finalComponents,
    options: {
      parseFrontmatter: true, // 始终解析 frontmatter
      ...customOptions, // 传入的自定义 options (例如 mdxOptions 以外的)
      mdxOptions: {
        ...customOptions?.mdxOptions, // 传入的自定义 mdxOptions
        remarkPlugins: [
          remarkGfm,
          remarkBreaks,
          ...(customOptions?.mdxOptions?.remarkPlugins || []), // 添加自定义 remark 插件
        ],
        rehypePlugins: [
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypeExternalLinks, {
            target: "_blank",
            rel: ["noopener", "noreferrer"],
            // content: { type: 'text', value: '➚' }
            content: externalLinkAppend
          }],
          [rehypePrettyCode, {
            theme: {
              light: 'github-light',
              dark: 'vitesse-dark',
            },
          }],
          ...(customOptions?.mdxOptions?.rehypePlugins || []), // 添加自定义 rehype 插件
        ],
      }, // 使用合并后的 mdxOptions
    },
  } as const;

  return await compileMDX(finalOptions);
}