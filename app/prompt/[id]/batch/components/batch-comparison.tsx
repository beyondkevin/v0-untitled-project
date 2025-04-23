"use client"

import { useState, useEffect } from "react"
import { Search, ArrowLeftRight, Star, StarOff, Tag, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface BatchItem {
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
  tags?: string[]
  isFavorite?: boolean
}

interface BatchSession {
  id: string
  name: string
  timestamp: string
  itemCount: number
}

interface BatchComparisonProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItems?: BatchItem[]
  onSelectItems?: (items: BatchItem[]) => void
  allBatchSessions: BatchSession[]
  allBatchItems: BatchItem[]
}

export default function BatchComparison({
  open,
  onOpenChange,
  selectedItems = [],
  onSelectItems,
  allBatchSessions,
  allBatchItems,
}: BatchComparisonProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSession, setSelectedSession] = useState<string>("all")
  const [filteredItems, setFilteredItems] = useState<BatchItem[]>(allBatchItems)
  const [compareItems, setCompareItems] = useState<BatchItem[]>(selectedItems)
  const [activeTab, setActiveTab] = useState<"browse" | "compare">("browse")

  // Filter items based on search query and selected session
  useEffect(() => {
    let items = [...allBatchItems]

    // Filter by session
    if (selectedSession !== "all") {
      items = items.filter((item) => item.batchId === selectedSession)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.id.toLowerCase().includes(query) ||
          item.systemPrompt.toLowerCase().includes(query) ||
          item.userPrompt.toLowerCase().includes(query) ||
          item.response.toLowerCase().includes(query) ||
          (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query))),
      )
    }

    setFilteredItems(items)
  }, [searchQuery, selectedSession, allBatchItems])

  // Update parent component when compare items change
  useEffect(() => {
    if (onSelectItems) {
      onSelectItems(compareItems)
    }
  }, [compareItems, onSelectItems])

  const toggleItemForComparison = (item: BatchItem) => {
    if (compareItems.some((i) => i.id === item.id)) {
      setCompareItems(compareItems.filter((i) => i.id !== item.id))
    } else {
      // Limit to 2 items for comparison
      if (compareItems.length < 2) {
        setCompareItems([...compareItems, item])
      } else {
        // Replace the oldest selected item
        setCompareItems([compareItems[1], item])
      }
    }
  }

  const toggleFavorite = (itemId: string) => {
    // In a real app, this would update the database
    // For now, we'll just update the UI
    setFilteredItems(
      filteredItems.map((item) => (item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item)),
    )
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getItemDifferences = (item1: BatchItem, item2: BatchItem) => {
    const differences = []

    if (item1.systemPrompt !== item2.systemPrompt) {
      differences.push("系统提示词")
    }

    if (item1.userPrompt !== item2.userPrompt) {
      differences.push("用户提示词")
    }

    if (item1.temperature !== item2.temperature) {
      differences.push("温度")
    }

    if (item1.maxTokens !== item2.maxTokens) {
      differences.push("最大令牌数")
    }

    if (item1.response !== item2.response) {
      differences.push("响应")
    }

    return differences
  }

  // Function to highlight differences in text
  const highlightDifferences = (text1: string, text2: string) => {
    // This is a simplified implementation
    // In a real app, you would use a proper diff algorithm
    const lines1 = text1.split("\n")
    const lines2 = text2.split("\n")

    return lines1.map((line, i) => {
      if (i >= lines2.length || line !== lines2[i]) {
        return (
          <p key={i} className="bg-yellow-100 dark:bg-yellow-900/30">
            {line}
          </p>
        )
      }
      return <p key={i}>{line}</p>
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>批处理比较</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="browse"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "browse" | "compare")}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="border-b">
            <TabsList className="h-10">
              <TabsTrigger value="browse" className="data-[state=active]:bg-background">
                浏览批处理
              </TabsTrigger>
              <TabsTrigger value="compare" className="data-[state=active]:bg-background">
                比较
                {compareItems.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {compareItems.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="browse" className="flex-1 overflow-hidden flex flex-col data-[state=active]:flex">
            <div className="flex items-center gap-2 p-4 border-b">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索批处理项目..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="选择批处理会话" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有批处理</SelectItem>
                  {allBatchSessions.map((session) => (
                    <SelectItem key={session.id} value={session.id}>
                      {session.name} ({formatTimestamp(session.timestamp)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="grid gap-4">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">没有找到匹配的批处理项目</div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        compareItems.some((i) => i.id === item.id)
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {item.batchId.substring(0, 8)}#{item.sequenceNumber}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</span>
                            {item.tags &&
                              item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                          </div>
                          <h4 className="font-medium mt-1 line-clamp-1">{item.userPrompt}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            {item.isFavorite ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              /* Add tag functionality */
                            }}
                          >
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">系统提示词</p>
                          <p className="text-sm line-clamp-2">{item.systemPrompt}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">响应</p>
                          <p className="text-sm line-clamp-2">{item.response}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>温度: {item.temperature}</span>
                          <span>最大令牌: {item.maxTokens}</span>
                          <span>
                            状态:
                            <Badge
                              variant="outline"
                              className={`ml-1 ${
                                item.status === "success"
                                  ? "text-green-500 border-green-200"
                                  : "text-red-500 border-red-200"
                              }`}
                            >
                              {item.status === "success" ? "成功" : "失败"}
                            </Badge>
                          </span>
                        </div>
                        <Button
                          variant={compareItems.some((i) => i.id === item.id) ? "default" : "outline"}
                          size="sm"
                          className="gap-1"
                          onClick={() => toggleItemForComparison(item)}
                        >
                          <ArrowLeftRight className="h-3.5 w-3.5" />
                          {compareItems.some((i) => i.id === item.id) ? "取消选择" : "选择比较"}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compare" className="flex-1 overflow-hidden flex flex-col data-[state=active]:flex">
            {compareItems.length < 2 ? (
              <div className="flex-1 flex items-center justify-center flex-col gap-4 p-8">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
                  <ArrowLeftRight className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">选择两个批处理项目进行比较</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  在"浏览批处理"标签页中选择两个项目来查看它们之间的差异。
                  {compareItems.length === 1 && "（已选择1个项目，还需选择1个）"}
                </p>
                <Button variant="outline" onClick={() => setActiveTab("browse")}>
                  浏览批处理项目
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">比较差异</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {compareItems[0].batchId.substring(0, 8)}#{compareItems[0].sequenceNumber}
                      </Badge>
                      <span>vs</span>
                      <Badge variant="outline">
                        {compareItems[1].batchId.substring(0, 8)}#{compareItems[1].sequenceNumber}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">差异检测到的字段：</span>
                    {getItemDifferences(compareItems[0], compareItems[1]).length > 0 ? (
                      getItemDifferences(compareItems[0], compareItems[1]).map((diff) => (
                        <Badge key={diff} variant="secondary">
                          {diff}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">没有检测到差异</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 p-6">
                  {/* Left item */}
                  <div>
                    <div className="mb-4">
                      <Badge variant="outline" className="font-mono text-xs mb-2">
                        {compareItems[0].batchId.substring(0, 8)}#{compareItems[0].sequenceNumber}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{formatTimestamp(compareItems[0].timestamp)}</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">系统提示词</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[0].systemPrompt}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">用户提示词</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[0].userPrompt}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">参数</h4>
                        <div className="bg-muted/30 p-3 rounded grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">温度:</span> {compareItems[0].temperature}
                          </div>
                          <div>
                            <span className="font-medium">最大令牌数:</span> {compareItems[0].maxTokens}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">响应内容</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[1].response !== compareItems[0].response
                            ? highlightDifferences(compareItems[0].response, compareItems[1].response)
                            : compareItems[0].response}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right item */}
                  <div>
                    <div className="mb-4">
                      <Badge variant="outline" className="font-mono text-xs mb-2">
                        {compareItems[1].batchId.substring(0, 8)}#{compareItems[1].sequenceNumber}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{formatTimestamp(compareItems[1].timestamp)}</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">系统提示词</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[1].systemPrompt}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">用户提示词</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[1].userPrompt}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">参数</h4>
                        <div className="bg-muted/30 p-3 rounded grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">温度:</span> {compareItems[1].temperature}
                          </div>
                          <div>
                            <span className="font-medium">最大令牌数:</span> {compareItems[1].maxTokens}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">响应内容</h4>
                        <div className="bg-muted/30 p-3 rounded text-sm whitespace-pre-wrap">
                          {compareItems[0].response !== compareItems[1].response
                            ? highlightDifferences(compareItems[1].response, compareItems[0].response)
                            : compareItems[1].response}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
