"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import BatchResultsTable from "./components/batch-results-table"
import BatchFileUploader from "./components/batch-file-uploader"
import TemplateFileDownloader from "./components/template-file"
import { generateUUID, generateBatchSessionId } from "./utils/batch-utils"

export default function BatchPageClient() {
  const [previewData, setPreviewData] = useState<any[]>([])
  const [batchResults, setBatchResults] = useState<any[]>([])
  const [batchStatus, setBatchStatus] = useState<"idle" | "processing" | "completed" | "error">("idle")
  const [batchProgress, setBatchProgress] = useState(0)
  const [activeTab, setActiveTab] = useState<"upload" | "preview" | "results">("upload")
  const [batchSessionId, setBatchSessionId] = useState("")
  const [allBatchSessions, setAllBatchSessions] = useState<any[]>([])
  const [isBatchComparisonOpen, setIsBatchComparisonOpen] = useState(false)
  const [selectedBatchItems, setSelectedBatchItems] = useState<any[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 模拟数据
  useEffect(() => {
    if (previewData.length === 0) {
      // 为了展示效果，自动加载一些示例数据
      const mockData = [
        {
          systemPrompt: "你是一个名为Knit的服务的助手。请专业地回答问题。",
          userPrompt: "Knit能做什么？",
          temperature: 0.7,
          maxTokens: 500,
        },
        {
          systemPrompt: "你是一个有帮助的编程助手。提供简洁的代码示例。",
          userPrompt: "如何创建React组件？",
          temperature: 0.5,
          maxTokens: 800,
        },
        {
          systemPrompt: "你是一个营销专家。生成创意内容。",
          userPrompt: "为智能水瓶写一个产品描述。",
          temperature: 0.9,
          maxTokens: 600,
        },
      ]
      setPreviewData(mockData)
    }
  }, [previewData.length])

  const handleFileProcessed = (data: any[]) => {
    setPreviewData(data)
    setActiveTab("preview")
  }

  const handleRunBatch = async () => {
    if (previewData.length === 0) return

    // 生成新的批处理会话ID
    const newBatchSessionId = generateBatchSessionId()
    setBatchSessionId(newBatchSessionId)

    // 添加到会话列表
    const newSession = {
      id: newBatchSessionId,
      name: `批处理 #${allBatchSessions.length + 1}`,
      timestamp: new Date().toISOString(),
      itemCount: previewData.length,
    }
    setAllBatchSessions([...allBatchSessions, newSession])

    setBatchStatus("processing")
    setBatchProgress(0)
    setBatchResults([])

    const results = []
    const total = previewData.length

    for (let i = 0; i < total; i++) {
      const item = previewData[i]
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 生成模拟响应
      const response = `This is a simulated response for batch item #${i + 1}.
    
System Prompt: ${item.systemPrompt.substring(0, 50)}...
User Prompt: ${item.userPrompt.substring(0, 50)}...

Knit is a prompt managing tool that allows users to:
1. Store, edit, and run their prompts in different projects.
2. Grant member access to projects.
3. Provide full version control for prompt management.`

      // 为每个结果生成唯一ID
      const resultItem = {
        ...item,
        id: generateUUID(),
        batchId: newBatchSessionId,
        sequenceNumber: i + 1,
        response,
        status: "success",
        timestamp: new Date().toISOString(),
      }

      results.push(resultItem)

      setBatchProgress(Math.round(((i + 1) / total) * 100))
      setBatchResults([...results])
    }

    setBatchStatus("completed")
    setActiveTab("results")
  }

  const resetBatchProcess = () => {
    setPreviewData([])
    setBatchResults([])
    setBatchStatus("idle")
    setBatchProgress(0)
    setActiveTab("upload")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">批量处理</h1>
        <p className="text-sm text-muted-foreground">上传包含多个提示词的文件，批量处理并比较结果。</p>
      </div>

      <div className="border-b mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "upload" ? "border-black" : "border-transparent"}`}
            onClick={() => setActiveTab("upload")}
          >
            1. 上传文件
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "preview" ? "border-black" : "border-transparent"} ${previewData.length === 0 ? "text-gray-400" : ""}`}
            onClick={() => previewData.length > 0 && setActiveTab("preview")}
            disabled={previewData.length === 0}
          >
            2. 预览与配置
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === "results" ? "border-black" : "border-transparent"} ${batchResults.length === 0 ? "text-gray-400" : ""}`}
            onClick={() => batchResults.length > 0 && setActiveTab("results")}
            disabled={batchResults.length === 0}
          >
            3. 结果
          </button>
        </div>
      </div>

      {activeTab === "upload" && (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="mb-6 text-center">
            <h3 className="text-lg font-medium mb-2">上传批处理文件</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              上传包含系统提示词、用户提示词和参数列的Excel文件。
            </p>
          </div>

          <BatchFileUploader onFileProcessed={handleFileProcessed} />

          <div className="mt-8">
            <h4 className="font-medium mb-2">文件格式要求</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <table className="text-sm w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Column A</th>
                    <th className="text-left py-2">Column B</th>
                    <th className="text-left py-2">Column C</th>
                    <th className="text-left py-2">Column D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">System Prompt</td>
                    <td className="py-2">User Prompt</td>
                    <td className="py-2">Temperature</td>
                    <td className="py-2">Max Tokens</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center">
              <TemplateFileDownloader />
            </div>
          </div>
        </div>
      )}

      {activeTab === "preview" && (
        <div>
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">数据预览</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={resetBatchProcess}>
                上传新文件
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-black text-white hover:bg-black/90"
                onClick={handleRunBatch}
                disabled={batchStatus === "processing"}
              >
                {batchStatus === "processing" ? "处理中..." : "运行批处理"}
              </Button>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-2 px-4 text-left">#</th>
                  <th className="py-2 px-4 text-left">系统提示词</th>
                  <th className="py-2 px-4 text-left">用户提示词</th>
                  <th className="py-2 px-4 text-left">Temperature</th>
                  <th className="py-2 px-4 text-left">Max Tokens</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <div className="max-w-xs truncate" title={item.systemPrompt}>
                        {item.systemPrompt}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="max-w-xs truncate" title={item.userPrompt}>
                        {item.userPrompt}
                      </div>
                    </td>
                    <td className="py-2 px-4">{item.temperature}</td>
                    <td className="py-2 px-4">{item.maxTokens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {batchStatus === "processing" && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">批处理进行中...</div>
                <div className="text-sm text-muted-foreground">
                  {batchProgress}% ({batchResults.length}/{previewData.length})
                </div>
              </div>
              <Progress value={batchProgress} className="h-2" />
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">当前处理：</div>
                  <div className="text-xs text-muted-foreground">
                    项目 {batchResults.length + 1}/{previewData.length}
                  </div>
                </div>
                {previewData[batchResults.length] && (
                  <div className="text-sm">
                    <div className="mb-1">
                      <span className="font-medium">系统提示词：</span>
                      {previewData[batchResults.length].systemPrompt.substring(0, 50)}
                      {previewData[batchResults.length].systemPrompt.length > 50 ? "..." : ""}
                    </div>
                    <div>
                      <span className="font-medium">用户提示词：</span>
                      {previewData[batchResults.length].userPrompt.substring(0, 50)}
                      {previewData[batchResults.length].userPrompt.length > 50 ? "..." : ""}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "results" && (
        <div>
          <BatchResultsTable
            results={batchResults}
            onCompare={(items) => {
              setSelectedBatchItems(items)
              setIsBatchComparisonOpen(true)
            }}
            batchSessionId={batchSessionId}
          />

          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">批处理统计</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBatchComparisonOpen(true)}
                className="flex items-center gap-1"
              >
                <ArrowLeftRight className="h-4 w-4 mr-1" />
                浏览所有批处理
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-md border">
                <div className="text-xs text-muted-foreground">总请求数</div>
                <div className="text-xl font-medium">{batchResults.length}</div>
              </div>
              <div className="p-3 bg-white rounded-md border">
                <div className="text-xs text-muted-foreground">成功请求</div>
                <div className="text-xl font-medium text-green-600">{batchResults.length}</div>
              </div>
              <div className="p-3 bg-white rounded-md border">
                <div className="text-xs text-muted-foreground">平均令牌数</div>
                <div className="text-xl font-medium">~350</div>
              </div>
              <div className="p-3 bg-white rounded-md border">
                <div className="text-xs text-muted-foreground">总成本</div>
                <div className="text-xl font-medium">$0.00075</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
