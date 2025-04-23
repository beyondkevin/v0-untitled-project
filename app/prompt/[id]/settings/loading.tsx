import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="flex flex-col w-full h-full p-6 space-y-6">
      <Skeleton className="h-8 w-48" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-md" />
          <div className="flex space-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-36" />
        <div className="space-y-2">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-md" />
            ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}
