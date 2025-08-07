import fs from 'fs';
import path from 'path';
import { walk } from './directory-walk'; // 复用您项目中的 walk 函数
import { compileMdx } from './mdx';
import { ReactElement } from 'react';

// 定义文章元数据 (Frontmatter) 和文章数据的接口
export interface PostFrontmatter {
    title: string;
    date: string;
    description?: string;
    summary?: string;
    slug: string;
    tags?: string[];
    categories?: string[];
    draft?: boolean;
    featuredImagePreview?: string;
    wordCount: number;
    [key: string]: any;
}


export interface PostPaginationInfo {
    slug: string;
    frontmatter: PostFrontmatter;
}

export interface Post extends PostPaginationInfo {
    content: ReactElement;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');


/**
 * 统计给定文本中的总字数，支持中文字符和英文单词。
 *
 * 该函数在统计前会进行如下预处理：
 * - 移除 frontmatter 区块（以 '---' 分隔）。
 * - 移除 MDX 的 import 语句。
 * - 移除 HTML/MDX 标签。
 * - 移除代码块（以三个反引号包裹）。
 * - 移除 Markdown 特殊字符。
 *
 * 统计规则：
 * - 每个中文字符算作一个字。
 * - 每个英文单词或数字算作一个词。
 *
 * @param text - 要分析的输入字符串。
 * @returns 文本中的中文字符数与英文单词/数字总和。
 */
function countWords(text: string): number {
    // 移除 Frontmatter
    text = text.replace(/---[\s\S]*?---/, '');
    // 移除 MDX import 语句
    text = text.replace(/import[\s\S]*?;/g, '');
    // 移除 HTML/MDX 标签
    text = text.replace(/<[^>]*>/g, ' ');
    // 移除代码块
    text = text.replace(/```[\s\S]*?```/g, '');
    // 移除 Markdown 特殊字符
    text = text.replace(/[#*`~_=\[\]()]/g, '');

    // 统计中文字符
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
    // 统计英文单词（和数字）
    const englishWords = text.match(/[a-zA-Z0-9'-]+/g) || [];

    return chineseChars.length + englishWords.length;
}   

/**
 * 核心函数：读取并解析所有文章，只在模块首次加载时执行一次。
 */
async function fetchAllPosts(): Promise<Post[]> {
    console.log('--- Reading all MDX files from disk... ---'); // 添加日志，方便观察执行次数

    const allPosts: Post[] = [];

    for (const [dirPath, __, files] of walk(postsDirectory)) {
        const mdFiles = files.filter(file => file.endsWith('.mdx') || file.endsWith('.md'));

        for (const file of mdFiles) {
            const filePath = path.join(dirPath, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');

            const wordCount = countWords(fileContents);

            const { content, frontmatter } = await compileMdx(fileContents);


            // 如果是草稿，则不添加到文章列表中
            if (frontmatter.draft === true) {
                continue;
            }

            frontmatter.wordCount = wordCount;

            allPosts.push({
                slug: (frontmatter.slug as string) || file.replace(/\.mdx?$/, ''),
                // 类型断言，确保 data 符合 PostFrontmatter 接口
                frontmatter: frontmatter as PostFrontmatter,
                content,
            });
        }
    }

    // 按日期降序排序
    return allPosts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

// =================================================================================
// 关键：在模块顶层调用一次获取函数，并将结果缓存起来。
// Node.js 会缓存这个模块的导出，因此 allPosts 只会被计算一次。
// =================================================================================
const allPosts: Post[] = await fetchAllPosts();
const postsBySlug = new Map<string, Post>(allPosts.map(post => [post.slug, post]));


// =================================================================================
// 导出基于缓存数据的 "API" 函数
// =================================================================================

/**
 * 获取所有文章的完整数据。
 */
export function getAllPosts(): Post[] {
    return allPosts;
}

/**
 * 获取文章总数量
 * @returns 文章总数量
 */
export function getNumberOfPosts(): Number {
    return allPosts.length;
}

/**
 * 获取所有文章的预览信息（不含文章正文），用于列表页。
 */
export function getAllPostPreviews() {
    return allPosts.map(post => ({
        slug: post.slug,
        frontmatter: post.frontmatter,
    }));
}

/**
 * 根据 slug 获取单篇文章的完整数据。
 * @param slug 文章的 slug
 */
export function getPostBySlug(slug: string): Post | undefined {
    return postsBySlug.get(slug);
}

/**
 * 获取所有标签及其出现的次数。
 */
export function getAllTags(): Map<string, number> {
    const tagsCount = new Map<string, number>();
    for (const post of allPosts) {
        post.frontmatter.tags?.forEach((tag) => {
            tagsCount.set(tag, (tagsCount.get(tag) || 0) + 1);
        });
    }
    return tagsCount;
}

/**
 * 获取所有分类及其出现的次数。
 */
export function getAllCategories(): Map<string, number> {
    const categoriesCount = new Map<string, number>();
    for (const post of allPosts) {
        post.frontmatter.categories?.forEach((category) => {
            categoriesCount.set(category, (categoriesCount.get(category) || 0) + 1);
        });
    }
    return categoriesCount;
}

/**
 * 获取用于 `generateStaticParams` 的所有文章 slug。
 */
export function getAllPostSlugs() {
    return allPosts.map(post => ({
        slug: post.slug,
    }));
}


/**
 * 获取分页后的文章预览信息，跳过自用文章。
 * @param page - 当前页码 (从 1 开始)
 * @param limit - 每页的文章数量
 * @param ignorePostForSelf - 是否忽略 自用的 文章
 */
export function getPaginatedPosts(
    page: number = 1,
    limit: number = 5,
    ignorePostForSelf: boolean = true,
    filterFunction: (value: Post, index: number, array: Post[]) => boolean = () => true
) {
    let startIndex = (page - 1) * limit;
    let endIndex = page * limit;

    console.log("--- 开始读取文章元数据 ---")
    // 从已缓存的 allPosts 数组中切片，获取当前页的文章
    const filteredPosts = allPosts.filter(filterFunction);
    const rightPosts = ignorePostForSelf ? filteredPosts.filter((value) => {
        const categories = value.frontmatter.categories ?? [];
        return !(categories.includes("自用"));
    }) : filteredPosts;
    let paginatedPosts = rightPosts.slice(startIndex, endIndex);

    const totalPosts = rightPosts.length;
    const totalPages = Math.ceil(totalPosts / limit);

    console.log("--- 读取文章头成功 ---")

    return {
        posts: paginatedPosts.map(post => ({ // 只返回预览所需信息
            slug: post.slug,
            frontmatter: post.frontmatter,
        } satisfies PostPaginationInfo)),
        currentPage: page,
        totalPages,
        hasNextPage: endIndex < totalPosts,
        hasPrevPage: startIndex > 0,
    };
}