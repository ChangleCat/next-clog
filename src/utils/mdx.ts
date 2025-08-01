import { compileMDX, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// 导入所有默认支持的 MDX 组件
import NoteCard from "@/components/shortcodes/note-card";
import { Timeline, TimelineItem } from "@/components/shortcodes/timeline";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import { HightlightMathExpression } from "@/components/shortcodes/TemporaryComponents";

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
        ...customComponents,
    };

    // 2. 合并 MDX 选项和插件
    // 确保默认插件和自定义插件都能生效
    const finalMdxOptions = {
        ...customOptions?.mdxOptions, // 传入的自定义 mdxOptions
        remarkPlugins: [
            remarkGfm,
            ...(customOptions?.mdxOptions?.remarkPlugins || []), // 添加自定义 remark 插件
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            [rehypePrettyCode, {
                theme: {
                    light: 'github-light',
                    dark: 'vitesse-dark',
                },
            }],
            ...(customOptions?.mdxOptions?.rehypePlugins || []), // 添加自定义 rehype 插件
        ],
    };

    // 3. 构建最终的编译配置
    const finalOptions: MDXRemoteProps = {
        source,
        components: finalComponents,
        options: {
            parseFrontmatter: true, // 始终解析 frontmatter
            ...customOptions, // 传入的自定义 options (例如 mdxOptions 以外的)
            mdxOptions: (finalMdxOptions as (Omit<any, "outputFormat" | "providerImportSource">)), // 使用我们合并后的 mdxOptions
        },
    };

    return await compileMDX(finalOptions);
}