"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronDown,
  Copy,
  Clock,
  Settings,
  Info,
  Play,
  BarChart2,
  Edit,
  Save,
  Trash,
  Download,
  Share2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PromptVariables from "@/components/prompt-variables"
import CompareModal from "@/components/compare-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ResponsePanel from "@/components/response-panel"

export default function PromptPageClient({ params }) {
  const [showCompare, setShowCompare] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [responseGenerated, setResponseGenerated] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [responses, setResponses] = useState([])
  const [maxLength, setMaxLength] = useState("500")
  const [temperature, setTemperature] = useState("0.7")
  const [systemPrompt, setSystemPrompt] = useState(`你是一个名为 Knit 的服务助手。

Knit 是一个提示词管理工具，具有以下功能：

- 在不同项目中存储/编辑/运行用户的提示词
- 项目成员访问控制
- 完整版本控制
- 提示词中的多变量支持
- 支持 OpenAI/Claude 模型，未来将支持更多模型

请以有帮助的方式回应用户。保持简洁明了。`)
  const [userPrompt, setUserPrompt] = useState("你好，我的问题是 {question}")

  const handleRun = () => {
    setIsRunning(true)

    // 模拟API调用延迟
    setTimeout(() => {
      setIsRunning(false)
      setResponseGenerated(true)

      // 添加新的响应到响应列表
      const newResponse = {
        id: Date.now(),
        text: "Knit 是一个提示词管理工具，允许用户：\n\n1. 在不同项目中存储、编辑和运行他们的提示词。\n2. 控制项目成员的访问权限。\n3. 使用完整的版本控制功能。\n4. 在提示词中使用多变量支持。\n5. 目前支持 OpenAI 和 Claude 模型，未来将支持更多模型。",
        stats: {
          characters: 564,
          tokens: 217,
          duration: 4.7,
          cost: 0.00017,
        },
        timestamp: new Date().toISOString(),
        model: "claude-3-haiku",
      }

      setResponses([newResponse, ...responses])
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white font-bold text-xl">
                #
              </div>
            </a>
            <div className="text-gray-500 flex items-center gap-1">
              <a href="/" className="hover:text-gray-700">
                个人
              </a>
              <span>/</span>
              <div className="flex items-center">
                <span>
                  {params.id === "text-prompt"
                    ? "文本提示词示例"
                    : params.id === "image-prompt"
                      ? "图像提示词示例"
                      : "函数调用提示词示例"}
                </span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = `/prompt/${params.id}/history`)}>
              <Clock className="h-4 w-4 mr-1" />
              历史
            </Button>
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = `/prompt/${params.id}/settings`)}>
              <Settings className="h-4 w-4 mr-1" />
              设置
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>查看提示词帮助信息</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="editor" className="px-4">
                编辑器
              </TabsTrigger>
              <TabsTrigger value="responses" className="px-4">
                响应历史 ({responses.length})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              {editMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                    取消
                  </Button>
                  <Button className="bg-black hover:bg-gray-800 text-white" size="sm">
                    <Save className="h-4 w-4 mr-1" />
                    保存
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    更多操作
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    复制提示词
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    导出提示词
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    分享提示词
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="h-4 w-4 mr-2" />
                    删除提示词
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <TabsContent value="editor" className="mt-0">
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="mb-4 flex items-center gap-3">
                  <Select defaultValue="claude-3-haiku">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="选择模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
                      <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-1" />
                    复制
                  </Button>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">最大长度:</span>
                    <input
                      type="text"
                      value={maxLength}
                      className="w-12 h-8 border rounded text-center text-sm"
                      onChange={(e) => setMaxLength(e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">温度:</span>
                    <input
                      type="text"
                      value={temperature}
                      className="w-12 h-8 border rounded text-center text-sm"
                      onChange={(e) => setTemperature(e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>

                  <Button variant="outline" size="sm">
                    查看代码
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-md">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium text-gray-700">系统提示词</h3>
                    </div>
                    <Textarea
                      className="border-0 rounded-none min-h-[200px] resize-none"
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h3 className="text-sm font-medium text-gray-700">用户提示词</h3>
                    </div>
                    <Textarea
                      className="border-0 rounded-none min-h-[200px] resize-none"
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      readOnly={!editMode}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {responseGenerated && (
                      <>
                        <div className="flex items-center gap-1">
                          <span>字符数:</span>
                          <span className="font-medium">564</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Token数:</span>
                          <span className="font-medium">217</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>耗时:</span>
                          <span className="font-medium">4.7s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>成本:</span>
                          <span className="font-medium">$0.00017</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={handleRun} className="bg-black hover:bg-gray-800 text-white" disabled={isRunning}>
                      {isRunning ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938V20h4a8 8 0 018 8v-4a4 4 0 00-4-4h-4v-4z"
                            />
                          </svg>
                          运行中...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-1" />
                          运行
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setShowCompare(true)}>
                      对比
                    </Button>
                    <Button variant="outline" size="icon">
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <ResponsePanel responseGenerated={responseGenerated} response={responses[0]} />
              </div>

              <div className="w-[350px]">
                <PromptVariables readOnly={!editMode} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="mt-0">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                <h3 className="font-medium">响应历史</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="筛选模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有模型</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="gpt">GPT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出
                  </Button>
                </div>
              </div>

              <div className="divide-y">
                {responses.length > 0 ? (
                  responses.map((response) => (
                    <div key={response.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-blue-200"
                          >
                            {response.model}
                          </Badge>
                          <span className="text-sm text-gray-500">{new Date(response.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            复制
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm whitespace-pre-line mb-3">{response.text}</div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div>字符数: {response.stats.characters}</div>
                        <div>Token数: {response.stats.tokens}</div>
                        <div>耗时: {response.stats.duration}s</div>
                        <div>成本: ${response.stats.cost.toFixed(5)}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <div className="mb-2">尚无响应记录</div>
                    <div className="text-sm">运行提示词以生成响应</div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {showCompare && <CompareModal onClose={() => setShowCompare(false)} />}
    </div>
  )
}
