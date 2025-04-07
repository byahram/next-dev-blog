import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  slug: string;
  category: string;
}

const postsDirectory = path.join(process.cwd(), "src", "posts");

// 모든 카테고리(폴더 이름) 목록 가져오기
export function getAllCategories(): string[] {
  const categories = fs.readdirSync(postsDirectory);
  return categories;
}

// 모든 게시물 가져오기
export function getAllPosts(): BlogPostMeta[] {
  const categories = fs.readdirSync(postsDirectory);

  const posts = categories.flatMap((category) => {
    const dir = path.join(postsDirectory, category);
    const files = fs.readdirSync(dir);

    return files.map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);
      const slug = filename.replace(/\.mdx$/, "");

      return {
        ...(data as Omit<BlogPostMeta, "slug" | "category">),
        slug,
        category,
      };
    });
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 특정 카테고리의 게시물만 가져오기
export async function getPostsByCategory(
  category: string
): Promise<BlogPostMeta[]> {
  const dir = path.join(postsDirectory, category);
  const files = fs.readdirSync(dir);

  const posts = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    const slug = filename.replace(/\.mdx$/, "");

    return {
      ...(data as Omit<BlogPostMeta, "slug" | "category">),
      slug,
      category,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 게시물 category/slug 경로 목록만 가져오기 (라우팅용)
export function getPostSlugs(): { category: string; slug: string }[] {
  const categories = fs.readdirSync(postsDirectory);

  return categories.flatMap((category) => {
    const dir = path.join(postsDirectory, category);
    const files = fs.readdirSync(dir);

    return files.map((filename) => ({
      category,
      slug: filename.replace(/\.mdx$/, ""),
    }));
  });
}

// 단일 게시물 내용 + frontmatter 가져오기
export async function getPostBySlug(category: string, slug: string) {
  const filePath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

// 특정 태그를 포함하는 게시물 목록 반환
export function getPostsByTag(tag: string) {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

// 제목, 설명, 태그에 query 포함된 게시물 필터링
export function searchPosts(query: string) {
  const lowerQuery = query.toLowerCase();

  return getAllPosts().filter(
    (post) =>
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  );
}
