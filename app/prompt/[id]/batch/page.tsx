import BatchPageClient from "./BatchPageClient"

export default function BatchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-14 items-center px-4">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              个人 / 示例提示词 / <span className="font-medium">批量处理</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full h-10 w-10 bg-gray-100 flex items-center justify-center">J</div>
              <span className="text-xs font-medium">starter</span>
            </div>
          </div>
        </div>
      </header>

      <BatchPageClient />
    </div>
  )
}
