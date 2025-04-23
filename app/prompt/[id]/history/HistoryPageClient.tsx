"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Clock, ArrowLeftRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟历史数据
const historyData = [
  {
    id: "hist-1",
    timestamp: "2023-04-14T15:30:22Z",
    model: "claude-3-haiku",
    systemPrompt: "You are an assistant of a service called Knit...",
    userPrompt: "What is Knit?",
    response: "Knit is a prompt managing tool that allows users to...",
    tokens: 286,
    latency: 1.2,
  },
  {
    id: "hist-2",
    timestamp: "2023-04-14T14:25:10Z",
    model: "gpt-4o-mini",
    systemPrompt: "You are an assistant of a service called Knit...",
    userPrompt: "How can I create a new project in Knit?",
    response: "To create a new project in Knit, follow these steps...",
    tokens: 312,
    latency: 1.5,
  },
  {
    id: "hist-3",
    timestamp: "2023-04-14T12:15:45Z",
    model: "claude-3-haiku",
    systemPrompt: "You are an assistant of a service called Knit...",
    userPrompt: "What are the pricing plans for Knit?",
    response: "Knit offers several pricing plans to suit different needs...",
    tokens: 345,
    latency: 1.3,
  },
  {
    id: "hist-4",
    timestamp: "2023-04-13T18:40:12Z",
    model: "gpt-4o",
    systemPrompt: "You are an assistant of a service called Knit...",
    userPrompt: "How can I share my prompts with team members?",
    response: "To share your prompts with team members in Knit...",
    tokens: 298,
    latency: 1.8,
  },
  {
    id: "hist-5",
    timestamp: "2023-04-13T16:20:33Z",
    model: "claude-3-haiku",
    systemPrompt: "You are an assistant of a service called Knit...",
    userPrompt: "What is the difference between system and user prompts?",
    response: "In Knit, system prompts and user prompts serve different purposes...",
    tokens: 356,
    latency: 1.4,
  },
]

export default function HistoryPageClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"details" | "compare">("details")
  const [filteredHistory, setFilteredHistory] = useState(historyData)
  const [selectedModel, setSelectedModel] = useState<string>("all")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (!query.trim()) {
      setFilteredHistory(historyData)
      return
    }

    const filtered = historyData.filter(
      (item) =>
        item.userPrompt.toLowerCase().includes(query.toLowerCase()) ||
        item.response.toLowerCase().includes(query.toLowerCase()) ||
        item.model.toLowerCase().includes(query.toLowerCase()),
    )

    setFilteredHistory(filtered)
  }

  const handleFilterByModel = (model: string) => {
    setSelectedModel(model)

    if (model === "all") {
      setFilteredHistory(historyData)
      return
    }

    const filtered = historyData.filter((item) => item.model === model)
    setFilteredHistory(filtered)
  }

  const handleViewDetails = (item: any) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
    setActiveTab("details")
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("已复制到剪贴板")
      })
      .catch((err) => {
        console.error("复制失败:", err)
      })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">历史记录</h1>
        <p className="text-sm text-muted-foreground">查看您的提示词运行历史记录。</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索历史记录..."
            className="pl-9"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select value={selectedModel} onValueChange={handleFilterByModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="选择模型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有模型</SelectItem>
            <SelectItem value="claude-3-haiku">Claude-3-Haiku</SelectItem>
            <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
            <SelectItem value="gpt-4o">GPT-4o</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <div className="bg-muted px-4 py-2 text-sm font-medium">历史记录 ({filteredHistory.length})</div>
        <div className="divide-y">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">没有找到匹配的历史记录</div>
          ) : (
            filteredHistory.map((item) => (
              <div key={item.id} className="p-4 hover:bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {item.id}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {item.model}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.tokens} 令牌</span>
                    <span>•</span>
                    <span>{item.latency}s</span>
                  </div>
                </div>
                <div className="text-sm line-clamp-2 mb-1">
                  <span className="font-medium">提示词: </span>
                  {item.userPrompt}
                </div>
                <div className="text-sm line-clamp-2 text-muted-foreground mb-3">
                  <span className="font-medium">响应: </span>
                  {item.response}
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => handleViewDetails(item)}>
                    <Clock className="h-4 w-4 mr-1" />
                    查看详情
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>历史记录详情</DialogTitle>
          </DialogHeader>

          <Tabs
            defaultValue="details"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "details" | "compare")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="details">详情</TabsTrigger>
              <TabsTrigger value="compare">比较</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              {selectedItem && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {selectedItem.id}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(selectedItem.id)}
                      title="复制ID"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(selectedItem.timestamp)}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">系统提示词</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">{selectedItem.systemPrompt}</div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">用户提示词</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">{selectedItem.userPrompt}</div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">参数</h4>
                    <div className="bg-gray-50 p-3 rounded grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-medium">模型:</span> {selectedItem.model}
                      </div>
                      <div>
                        <span className="font-medium">令牌数:</span> {selectedItem.tokens}
                      </div>
                      <div>
                        <span className="font-medium">延迟:</span> {selectedItem.latency}s
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">响应内容</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-wrap">{selectedItem.response}</div>
                  </div>

                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("compare")}>
                      <ArrowLeftRight className="h-4 w-4 mr-2" />
                      与当前版本比较
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="compare">
              <div className="text-center py-8">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <ArrowLeftRight className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">比较功能</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  此功能允许您将历史记录与当前版本进行比较，以查看变更内容。
                </p>
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  返回详情
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}
