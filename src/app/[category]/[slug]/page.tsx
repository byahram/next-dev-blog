import { getPostBySlug, getPostSlugs } from "@/utils/posts";
import { notFound } from "next/navigation";
import { Title } from "@/components/layout/Title";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXComponents } from "@/components/posts/MDXComponents";
import rehypePrettyCode from "rehype-pretty-code";
import { TopButton } from "@/components/layout/TopButton";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(({ category, slug }) => ({
    category,
    slug,
  }));
}

type Props = {
  params: { category: string; slug: string };
};

export default async function PostDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);
  if (!post) {
    notFound();
  }
  const { frontmatter, content } = post;

  return (
    <div className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full">
      <Breadcrumbs category={category} pageName={frontmatter.title} />
      <Title title={frontmatter.title} />
      <p className="text-muted-foreground text-sm mt-2">
        {new Date(frontmatter.date).toISOString().split("T")[0]}
      </p>

      {/* 본문 */}
      <div className="prose text-base dark:prose-invert mt-8 max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-muted prose-h2:pb-1 prose-h3:text-xl prose-h3:font-semibold prose-h4:text-lg prose-h4:font-medium prose-h5:text-base prose-h5:font-medium">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                rehypeAutolinkHeadings,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: false,
                  },
                ],
              ],
              format: "md",
            },
          }}
          components={MDXComponents}
        />
      </div>

      {/* 태그 */}
      {frontmatter.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {frontmatter.tags.map((tag: string) => (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              # {tag}
            </Button>
          ))}
        </div>
      )}

      {/* Top 버튼 추가 */}
      <TopButton />
    </div>
  );
}
