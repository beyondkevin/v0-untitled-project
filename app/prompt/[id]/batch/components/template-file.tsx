"use client"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TemplateFileDownloader() {
  const generateExcelTemplate = () => {
    // This is a simplified version. In a real implementation,
    // you would use a library like xlsx to create a proper Excel file

    // Create CSV data for the template
    const headers = ["System Prompt", "User Prompt", "Temperature", "Max Tokens"]
    const exampleRow = [
      "You are a helpful assistant. Be concise and professional.",
      "What is artificial intelligence?",
      "0.7",
      "500",
    ]

    const csvContent = [headers.join(","), exampleRow.join(",")].join("\n")

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "knit_batch_template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button variant="link" className="p-0 h-auto" onClick={generateExcelTemplate}>
      <Save className="h-3 w-3 mr-1" />
      下载模板文件
    </Button>
  )
}
