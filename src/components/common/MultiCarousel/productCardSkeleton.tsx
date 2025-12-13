import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="h-fit md:h-[360px] pt-3 pb-4 items-center justify-center rounded-3xl border bg-white shadow-sm space-y-4 p-4">
      <Skeleton className="w-full h-48 rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}