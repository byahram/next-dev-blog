import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  theme: "github-dark",
  keepBackground: false,
};

export async function parseMDX(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    },
    parseFrontmatter: true,
  });

  return mdxSource;
}
