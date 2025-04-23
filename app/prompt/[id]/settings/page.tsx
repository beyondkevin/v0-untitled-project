export function generateStaticParams() {
  // 预生成这些ID的静态路径
  return [{ id: "text-prompt" }, { id: "image-prompt" }, { id: "function-prompt" }]
}

export default function Page() {
  return (
    <div>
      <h1>Settings Page</h1>
      <p>This is the settings page for a specific prompt.</p>
    </div>
  )
}
