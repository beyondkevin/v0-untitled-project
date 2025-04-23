"use client"

import { useState } from "react"
import { Download, Eye, ArrowLeftRight, Copy, Star, StarOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatTimestamp } from "../utils/batch-utils"

interface BatchResult {
  id: string
  batchId: string
  sequenceNumber: number
  systemPrompt: string
  userPrompt: string
  temperature: number
  maxTokens: number
  response: string
  status: string
  timestamp: string
  isFavorite?: boolean
}

export default function BatchResultsTable({
  results,
  onCompare,
  batchSessionId,
}: {
  results: BatchResult[]
  onCompare: (items: BatchResult[]) => void
  batchSessionId: string
}) {
  const [selectedResult, setSelectedResult] = useState<BatchResult | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<BatchResult[]>([])

  const handleViewResponse = (result: BatchResult) => {
    setSelectedResult(result)
    setIsDialogOpen(true)
  }

  const handleExportResults = () => {
    // 在实际实现中，您会生成一个CSV/Excel文件
    // 这里我们只是显示一个提示
    alert("在实际环境中，这将下载结果为 CSV/Excel 文件，包含批处理ID和UUID")
  }

  const toggleItemForComparison = (item: BatchResult) => {
    if (selectedForComparison.some((i) => i.id === item.id)) {
      setSelectedForComparison(selectedForComparison.filter((i) => i.id !== item.id))
    } else {
      // 限制为2个项目进行比较
      if (selectedForComparison.length < 2) {
        setSelectedForComparison([...selectedForComparison, item])
      } else {
        // 替换最早选择的项目
        setSelectedForComparison([selectedForComparison[1], item])
      }
    }
  }

  const handleCompare = () => {
    if (selectedForComparison.length === 2) {
      onCompare(selectedForComparison)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // 可以添加一个提示，表示复制成功
        alert("已复制到剪贴板")
      })
      .catch((err) => {
        console.error("复制失败:", err)
      })
  }

  const toggleFavorite = (itemId: string) => {
    // 在实际应用中，这将更新数据库
    // 现在，我们只是更新UI
    console.log("Toggle favorite for item:", itemId)
  }

  return (
    <>
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">批处理结果 ({results.length})</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="font-mono text-xs">
              {batchSessionId}
            </Badge>
            <span className="text-xs text-muted-foreground">{formatTimestamp(new Date().toISOString())}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedForComparison.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleCompare}
              disabled={selectedForComparison.length !== 2}
            >
              <ArrowLeftRight className="h-4 w-4 mr-1" />
              比较 ({selectedForComparison.length}/2)
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleExportResults}>
            <Download className="h-4 w-4 mr-2" />
            导出结果
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">系统提示词</th>
              <th className="py-2 px-4 text-left">用户提示词</th>
              <th className="py-2 px-4 text-left">状态</th>
              <th className="py-2 px-4 text-left">响应长度</th>
              <th className="py-2 px-4 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={result.id}
                className={`border-b hover:bg-gray-50 ${
                  selectedForComparison.some((i) => i.id === result.id) ? "bg-blue-50 dark:bg-blue-950/20" : ""
                }`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {batchSessionId.substring(0, 8)}#{result.sequenceNumber}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(result.id)}
                      title="复制UUID"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleFavorite(result.id)}
                      title={result.isFavorite ? "取消收藏" : "收藏"}
                    >
                      {result.isFavorite ? (
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="max-w-xs truncate" title={result.systemPrompt}>
                    {result.systemPrompt.substring(0, 40)}...
                  </div>
                </td>
                <td className="py-2 px-4">
                  <div className="max-w-xs truncate" title={result.userPrompt}>
                    {result.userPrompt.substring(0, 40)}...
                  </div>
                </td>
                <td className="py-2 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {result.status}
                  </span>
                </td>
                <td className="py-2 px-4">{result.response.length} 字符</td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleViewResponse(result)}>
                      <Eye className="h-4 w-4 mr-1" />
                      查看
                    </Button>
                    <Button
                      variant={selectedForComparison.some((i) => i.id === result.id) ? "default" : "ghost"}
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => toggleItemForComparison(result)}
                    >
                      <ArrowLeftRight className="h-4 w-4 mr-1" />
                      {selectedForComparison.some((i) => i.id === result.id) ? "取消" : "比较"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>响应详情</DialogTitle>
          </DialogHeader>

          {selectedResult && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {batchSessionId.substring(0, 8)}#{selectedResult.sequenceNumber}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(selectedResult.id)}
                  title="复制UUID"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground">{formatTimestamp(selectedResult.timestamp)}</span>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">系统提示词</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">{selectedResult.systemPrompt}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">用户提示词</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">{selectedResult.userPrompt}</div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">参数</h4>
                <div className="bg-gray-50 p-3 rounded grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">温度:</span> {selectedResult.temperature}
                  </div>
                  <div>
                    <span className="font-medium">最大令牌数:</span> {selectedResult.maxTokens}
                  </div>
                  <div>
                    <span className="font-medium">时间戳:</span> {new Date(selectedResult.timestamp).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">状态:</span> {selectedResult.status}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">响应内容</h4>
                <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{selectedResult.response}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
