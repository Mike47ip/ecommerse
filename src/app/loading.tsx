import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="skeleton h-8 w-48 mb-6 rounded-xl" />
      <ProductGridSkeleton count={8} />
    </div>
  );
}
