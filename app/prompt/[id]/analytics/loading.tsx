import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col w-full h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-[300px] w-full rounded-lg" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <div className="space-y-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
        </div>
      </div>
    </div>
  )
}
