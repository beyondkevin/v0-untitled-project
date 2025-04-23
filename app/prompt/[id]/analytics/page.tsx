import AnalyticsPageClient from "./AnalyticsPageClient"

// 添加这个函数来预生成静态路径
export function generateStaticParams() {
  return [{ id: "text-prompt" }, { id: "image-prompt" }, { id: "function-prompt" }]
}

export default function AnalyticsPage() {
  return <AnalyticsPageClient />
}
