import Link from "next/link";
import { BlogPostMeta, getPostsByCategory } from "@/utils/posts";
import { Title } from "@/components/layout/Title";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-static";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  let posts: BlogPostMeta[] = [];

  try {
    posts = await getPostsByCategory(params.category);
  } catch (error) {
    console.error("Error reading directory:", error);
    return <p className="text-red-500">Error loading posts.</p>;
  }

  return (
    <div className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full">
      <Breadcrumbs pageName={params.category} />
      <Title title={`${params.category} Posts`}></Title>
      {posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse mt-4">
            <thead>
              <tr className="border-b text-center">
                <th className="p-2 w-[10%] text-muted-foreground">No</th>
                <th className="p-2 w-[40%]">Title</th>
                <th className="p-2 w-[20%] text-muted-foreground hidden md:table-cell">
                  Tags
                </th>
                <th className="p-2 w-[20%] text-muted-foreground hidden md:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.slug} className="border-b hover:bg-accent">
                  <td className="p-2 w-10 md:w-20">{index + 1}</td>
                  <td className="p-2 text-left">
                    <Link
                      href={`/${params.category}/${post.slug}`}
                      className="text-foreground hover:underline font-medium"
                    >
                      {post.title || post.slug}
                    </Link>
                  </td>
                  <td className="p-2 text-sm text-muted-foreground hidden md:table-cell">
                    {post.tags?.length ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-2 text-sm text-muted-foreground hidden md:table-cell">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-foreground mt-4">No posts found.</p>
      )}
    </div>
  );
}
