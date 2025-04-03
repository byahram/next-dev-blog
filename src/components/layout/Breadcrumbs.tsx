import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { Skeleton } from "../ui/Skeleton";

export const Breadcrumbs = ({
  pageName,
  isLoading,
}: {
  pageName?: string;
  isLoading?: boolean;
}) => {
  return (
    // <Breadcrumb className="h-20 bg-muted rounded-lg border flex items-center justify-start px-6">
    <Breadcrumb className="flex items-center justify-start pb-8">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage className="px-2 py-1 border bg-background rounded-sm">
          {isLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <BreadcrumbLink>{pageName || ""}</BreadcrumbLink>
          )}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
