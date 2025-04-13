"use client";

import Link from "next/link";
import { BlogPostMeta } from "@/utils/posts";
import { Badge } from "@/components/ui/Badge";

export function Table({
  allPosts,
  postsByCat,
  category,
}: {
  allPosts: BlogPostMeta[];
  postsByCat: BlogPostMeta[];
  category: string;
}) {
  return (
    <div className="overflow-x-auto my-6 ">
      <p className="text-sm text-muted_foreground mb-3">
        총 {allPosts.length}개의 글이 있습니다.
      </p>
      <table className="table-auto border-collapse borderw-full text-left w-full">
        <thead className="bg-card_solid">
          <tr className="border-b text-center">
            <th className="w-[5%] px-4 py-3 font-semibold border text-muted-foreground">
              No.
            </th>
            <th className="w-[50%] px-4 py-3 font-semibold border">Title</th>
            <th className="w-[10%] px-4 py-3 font-semibold border text-muted-foreground hidden md:table-cell">
              Category
            </th>
            <th className="w-[20%] px-4 py-3 font-semibold border text-muted-foreground hidden md:table-cell">
              Tags
            </th>
            <th className="w-[15%] px-4 py-3 font-semibold border text-muted-foreground hidden md:table-cell">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {postsByCat.map((post, index) => (
            <tr
              key={post.slug}
              className="border-b hover:bg-accent text-center"
            >
              <td className="px-4 py-2.5 border">{index + 1}</td>
              <td className="px-4 py-2.5 border text-foreground text-left">
                <Link
                  href={`/${category}/${post.slug}`}
                  className="hover:underline font-medium"
                >
                  {post.title || post.slug}
                </Link>
              </td>
              <td className="px-4 py-2.5 border text-muted-foreground hidden md:table-cell">
                <Badge variant="outline">{post.category || category}</Badge>
              </td>
              <td className="px-4 py-2.5 border text-muted-foreground hidden md:table-cell">
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
              <td className="px-4 py-2.5 border text-muted-foreground hidden md:table-cell">
                {new Date(post.date)
                  .toLocaleDateString("ko-KR")
                  .replace(/\.$/, "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
