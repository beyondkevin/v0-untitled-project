export function generateStaticParams() {
  // 预生成这些ID的静态路径
  return [{ id: "text-prompt" }, { id: "image-prompt" }, { id: "function-prompt" }]
}

export default function Page({ params }: { params: { id: string } }) {
  return <p>Prompt ID: {params.id}</p>
}
