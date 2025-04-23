import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <div className="space-y-4">
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-12 w-full max-w-md" />
        <Skeleton className="h-12 w-full max-w-md" />
      </div>
      <Skeleton className="h-10 w-24" />
    </div>
  )
}
