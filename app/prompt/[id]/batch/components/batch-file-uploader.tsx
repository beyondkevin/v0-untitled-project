"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Upload } from "lucide-react"

export default function BatchFileUploader({
  onFileProcessed,
}: {
  onFileProcessed: (data: any[]) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    processFile(file)
  }

  const processFile = (file: File) => {
    // In a real implementation, you would use a library like xlsx to parse Excel files
    // Here we're simulating the parsing process with a timeout

    setTimeout(() => {
      // Mock data that would come from parsing the Excel file
      const mockData = [
        {
          systemPrompt: "You are an assistant of a service called Knit. Respond professionally.",
          userPrompt: "What can Knit do?",
          temperature: 0.7,
          maxTokens: 500,
        },
        {
          systemPrompt: "You are a helpful coding assistant. Provide concise code examples.",
          userPrompt: "How do I create a React component?",
          temperature: 0.5,
          maxTokens: 800,
        },
        {
          systemPrompt: "You are a marketing expert. Generate creative content.",
          userPrompt: "Write a product description for a smart water bottle.",
          temperature: 0.9,
          maxTokens: 600,
        },
      ]

      onFileProcessed(mockData)
    }, 500)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFile(files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-12 w-full max-w-md text-center transition-colors ${
        isDragging ? "bg-gray-50 border-gray-400" : "border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-10 w-10 text-gray-400 mb-4" />

      <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="hidden" ref={fileInputRef} />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="mb-2 text-sm font-medium text-blue-600 hover:underline"
      >
        选择文件
      </button>
      <span className="text-sm text-gray-500"> 或拖拽文件到此处</span>

      <p className="mt-4 text-xs text-muted-foreground">支持的格式: .xlsx, .xls, .csv</p>
    </div>
  )
}
