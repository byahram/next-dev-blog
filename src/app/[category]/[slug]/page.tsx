import { PostContentWrapper } from "@/components/posts/PostContentWrapper";
import { getPostBySlug, getPostSlugs } from "@/utils/posts";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { MDXComponents } from "@/components/posts/MDXComponents";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map(({ category, slug }) => ({ category, slug }));
}

type Props = {
  params: { category: string; slug: string };
};

export default async function PostDetailPage({ params }: Props) {
  const { category, slug } = params;
  const post = await getPostBySlug(category, slug);
  if (!post) notFound();

  const mdxContent = await (
    <MDXRemote
      source={post.content}
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
  );

  return (
    <PostContentWrapper
      category={category}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
    >
      {mdxContent}
    </PostContentWrapper>
  );
}
