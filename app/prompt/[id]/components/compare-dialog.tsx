"use client"

import { useState, useEffect } from "react"
import { Code, Search, ArrowLeftRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CompareItem {
  id: string
  type: "version" | "batch"
  timestamp: string
  model: string
  maxTokens: number
  temperature: number
  systemPrompt: string
  userPrompt: string
  response: string
  batchId?: string
  sequenceNumber?: number
}

interface CompareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  allVersions: CompareItem[]
  allBatchItems: CompareItem[]
}

export default function CompareDialog({
  open,
  onOpenChange,
  allVersions = [],
  allBatchItems = [],
}: CompareDialogProps) {
  const [activeTab, setActiveTab] = useState<"version" | "id">("version")
  const [selectedVersion, setSelectedVersion] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<CompareItem[]>([])
  const [selectedItem, setSelectedItem] = useState<CompareItem | null>(null)
  const [currentVersion, setCurrentVersion] = useState<CompareItem | null>(null)

  // 初始化选择
  useEffect(() => {
    if (open && allVersions.length > 0) {
      // 默认选择最新的历史版本
      setSelectedVersion(allVersions[0].id)

      // 当前版本
      setCurrentVersion({
        id: "current",
        type: "version",
        timestamp: new Date().toISOString(),
        model: "claude-3-haiku",
        maxTokens: 500,
        temperature: 0.7,
        systemPrompt: "You are an assistant of a service called Knit...",
        userPrompt: "Hi, my question is What is Knit?",
        response:
          "Knit is a prompt managing tool that allows users to:\n1. Store, edit, and run their prompts in different projects.\n2. Manage project access for team members.",
      })
    }
  }, [open, allVersions])

  // 搜索功能
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = allBatchItems.filter(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        (item.batchId && item.batchId.toLowerCase().includes(query)) ||
        (item.sequenceNumber !== undefined && `${item.batchId}#${item.sequenceNumber}`.toLowerCase().includes(query)),
    )

    setSearchResults(results)
  }, [searchQuery, allBatchItems])

  // 获取选中的历史版本
  const getSelectedVersionItem = (): CompareItem | null => {
    if (!selectedVersion) return null
    return allVersions.find((v) => v.id === selectedVersion) || null
  }

  // 高亮差异
  const highlightDifferences = (text1: string, text2: string, isRemoved: boolean) => {
    if (!text1 || !text2) return text1

    const lines1 = text1.split("\n")
    const lines2 = text2.split("\n")

    return (
      <div>
        {lines1.map((line, i) => {
          if (i >= lines2.length || line !== lines2[i]) {
            return (
              <p key={i} className={isRemoved ? "bg-red-200" : "bg-green-200"}>
                {isRemoved ? "- " : "+ "}
                {line}
              </p>
            )
          }
          return <p key={i}>{line}</p>
        })}
      </div>
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>版本比较</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="version"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "version" | "id")}
          className="mt-2"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="version">按时间版本比较</TabsTrigger>
            <TabsTrigger value="id">按ID搜索比较</TabsTrigger>
          </TabsList>

          <TabsContent value="version" className="flex-1 overflow-hidden">
            <div className="flex-1 overflow-hidden grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">历史版本</div>
                  <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger className="w-40 h-8 text-xs">
                      <SelectValue placeholder="选择版本" />
                    </SelectTrigger>
                    <SelectContent>
                      {allVersions.map((version) => (
                        <SelectItem key={version.id} value={version.id}>
                          {formatTimestamp(version.timestamp)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {getSelectedVersionItem() && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <Code className="h-3 w-3" />
                        <span>{getSelectedVersionItem()?.model}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <span>{getSelectedVersionItem()?.maxTokens}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <span>{getSelectedVersionItem()?.temperature}</span>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-md overflow-auto max-h-[60vh] text-sm">
                      <div className="text-red-800">
                        <p>- [System Prompt]</p>
                        <p>- You are an assistant of a service called Knit.</p>
                        <p>-</p>
                        <p>- Knit is a prompt managing tool, which has these features:</p>
                        <p>-</p>
                        <p>- - store/edit/run user's prompts in different projects</p>
                        <p>- - member access for projects</p>
                        <p>- - full version control</p>
                        <p>- - multi-variables in prompt text</p>
                        <p>- - support OpenAI/Claude models, will support more models in the future</p>
                        <p>-</p>
                        <p>
                          - Respond to user in a helpful manner. Keep it concise and easy to
                          understand.11111111111111111111
                        </p>
                        <p>- ---</p>
                        <p>[User Prompt]</p>
                        <p>Hi, my question is What is Knit?</p>
                        <p>---</p>
                        <p>[Response]</p>
                        <p>Knit is a prompt managing tool that allows users to:</p>
                        <p>1. Store, edit, and run their prompts in different projects.</p>
                        <p className="bg-red-200">- 3. Provide full version control for prompt management.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">当前版本</div>
                  <div className="text-sm">{formatTimestamp(new Date().toISOString())}</div>
                </div>

                {currentVersion && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <Code className="h-3 w-3" />
                        <span>{currentVersion.model}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <span>{currentVersion.maxTokens}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs border rounded px-2 py-1">
                        <span>{currentVersion.temperature}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-md border overflow-auto max-h-[60vh] text-sm">
                      <p>[User Prompt]</p>
                      <p>Hi, my question is What is Knit?</p>
                      <p>---</p>
                      <p>[Response]</p>
                      <p>Knit is a prompt managing tool that allows users to:</p>
                      <p>1. Store, edit, and run their prompts in different projects.</p>
                      <p className="bg-green-200">+ 2. Manage project access for team members.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="id" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="输入批处理ID或项目ID进行搜索..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={!selectedItem}
                onClick={() => {
                  if (selectedItem) {
                    // 在实际应用中，这里会加载选定项目的详细信息
                    console.log("比较选定项目:", selectedItem.id)
                  }
                }}
              >
                <ArrowLeftRight className="h-4 w-4 mr-2" />
                与当前版本比较
              </Button>
            </div>

            {searchQuery && searchResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">没有找到匹配的批处理项目</div>
            ) : searchQuery ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 text-sm font-medium">搜索结果 ({searchResults.length})</div>
                <div className="divide-y max-h-[60vh] overflow-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer ${
                        selectedItem?.id === item.id ? "bg-blue-50 dark:bg-blue-950/20" : ""
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.batchId?.substring(0, 8)}#{item.sequenceNumber}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.model}</span>
                          <span>•</span>
                          <span>温度: {item.temperature}</span>
                        </div>
                      </div>
                      <div className="text-sm line-clamp-2 mb-1">
                        <span className="font-medium">提示词: </span>
                        {item.userPrompt}
                      </div>
                      <div className="text-sm line-clamp-2 text-muted-foreground">
                        <span className="font-medium">响应: </span>
                        {item.response.substring(0, 100)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">搜索批处理项目</h3>
                <p className="text-muted-foreground max-w-md">
                  输入批处理ID（如 BATCH-ABC123）或项目ID（如 BATCH-ABC123#1）来查找特定项目进行比较。
                </p>
              </div>
            )}

            {selectedItem && (
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">选定项目预览</h3>
                  <Badge variant="outline" className="font-mono">
                    {selectedItem.batchId?.substring(0, 8)}#{selectedItem.sequenceNumber}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">系统提示词</h4>
                    <div className="bg-muted/30 p-3 rounded text-sm max-h-[20vh] overflow-auto">
                      {selectedItem.systemPrompt}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">用户提示词</h4>
                    <div className="bg-muted/30 p-3 rounded text-sm max-h-[20vh] overflow-auto">
                      {selectedItem.userPrompt}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">响应内容</h4>
                  <div className="bg-muted/30 p-3 rounded text-sm max-h-[20vh] overflow-auto">
                    {selectedItem.response}
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      // 在实际应用中，这里会加载选定项目的详细信息并进行比较
                      console.log("比较选定项目:", selectedItem.id)
                    }}
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    与当前版本比较
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground mt-4">
          {activeTab === "version"
            ? "比较当前版本与历史版本，以更好地了解变更内容。"
            : "通过ID搜索特定批处理项目，与当前版本进行比较。"}
        </div>
      </DialogContent>
    </Dialog>
  )
}
