import {
  BlogPostMeta,
  getAllCategories,
  getPostsByCategory,
} from "@/utils/posts";
import { Title } from "@/components/layout/Title";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Table } from "@/components/ui/Table";
import { NoContent } from "@/components/ui/NoContent";
import { notFound } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

type Props = {
  params: Promise<{ category: string }>;
  searchParams?: { page?: string };
};

const POSTS_PER_PAGE = 10;

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const search = await searchParams;
  const page = Number(search?.page) || 1;

  let posts: BlogPostMeta[] = [];

  try {
    posts = await getPostsByCategory(category);
    console.log(posts);
  } catch (error) {
    console.error("Error reading directory:", error);
    return <p className="text-red-500">Error loading posts.</p>;
  }

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (page > totalPages && totalPages !== 0) {
    notFound();
  }

  const paginatedPosts = posts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <div className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full">
      <Breadcrumbs pageName={category} />
      <Title title={`${category} Posts`}></Title>
      {paginatedPosts.length > 0 ? (
        <>
          <Table
            allPosts={posts}
            postsByCat={paginatedPosts}
            category={category}
          />
          <Pagination className="mt-8">
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious href={`/${category}?page=${page - 1}`} />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={i}>
                    <PaginationLink href={`/${category}?page=${pageNumber}`}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext href={`/${category}?page=${page + 1}`} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <NoContent />
      )}
    </div>
  );
}
