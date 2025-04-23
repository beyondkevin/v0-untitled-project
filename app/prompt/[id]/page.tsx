export function generateStaticParams() {
  return [{ id: "text-prompt" }, { id: "image-prompt" }, { id: "function-prompt" }]
}

import PromptPageClient from "./PromptPageClient"

export default function PromptPage({ params }) {
  return <PromptPageClient params={params} />
}
