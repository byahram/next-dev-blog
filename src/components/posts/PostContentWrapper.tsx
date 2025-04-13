"use client";

import { useRef } from "react";
import { Title } from "@/components/layout/Title";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { TopButton } from "@/components/layout/TopButton";

type Props = {
  category: string;
  title: string;
  date: string;
  tags?: string[];
  children: React.ReactNode;
};

export function PostContentWrapper({
  category,
  title,
  date,
  tags,
  children,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollContainerRef}
      className="p-6 border overflow-y-scroll no-scrollbar w-full max-w-[100%] rounded-lg bg-muted h-full"
    >
      <Breadcrumbs category={category} pageName={title} />
      <Title title={title} />
      <p className="text-muted-foreground text-sm mt-2">
        {new Date(date).toISOString().split("T")[0]}
      </p>

      {/* 본문 */}
      <div className="prose text-base dark:prose-invert mt-8 max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-bold prose-h2:border-b prose-h2:border-muted prose-h2:pb-1 prose-h3:text-xl prose-h3:font-semibold prose-h4:text-lg prose-h4:font-medium prose-h5:text-base prose-h5:font-medium">
        {children}
      </div>

      {/* 태그 */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {tags.map((tag) => (
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

      {/* TopButton */}
      <TopButton scrollRef={scrollContainerRef} />
    </div>
  );
}
