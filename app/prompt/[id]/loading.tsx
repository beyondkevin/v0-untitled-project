import { Skeleton } from "@/components/ui/skeleton"

export default function PromptLoading() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full md:w-1/2 p-6 border-r border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-12 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-[300px] w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-36" />
            <div className="grid grid-cols-2 gap-2">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-24" />
          </div>

          <Skeleton className="h-[500px] w-full rounded-lg" />

          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}
