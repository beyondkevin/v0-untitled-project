"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronLeft, Play, Download, Upload, Plus, Trash, Save, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BatchPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [batchItems, setBatchItems] = useState([
    { id: 1, question: "什么是 Knit？", feature4: "提示词中的多变量支持", status: "待运行" },
    { id: 2, question: "Knit 有哪些功能？", feature4: "提示词中的多变量支持", status: "待运行" },
    { id: 3, question: "如何在 Knit 中使用变量？", feature4: "提示词中的多变量支持", status: "待运行" },
  ])

  const handleRunBatch = () => {
    setIsRunning(true)

    // 模拟批量运行
    let completed = 0
    const total = batchItems.length

    // 更新状态为"运行中"
    setBatchItems(batchItems.map((item) => ({ ...item, status: "运行中" })))

    // 模拟每个项目依次完成
    const runInterval = setInterval(() => {
      completed++

      setBatchItems((prevItems) =>
        prevItems.map((item, index) => (index < completed ? { ...item, status: "已完成" } : item)),
      )

      if (completed >= total) {
        clearInterval(runInterval)
        setIsRunning(false)
      }
    }, 1500)
  }

  const addBatchItem = () => {
    setBatchItems([
      ...batchItems,
      {
        id: Date.now(),
        question: "",
        feature4: "提示词中的多变量支持",
        status: "待运行",
      },
    ])
  }

  const removeBatchItem = (id) => {
    setBatchItems(batchItems.filter((item) => item.id !== id))
  }

  const updateBatchItem = (id, field, value) => {
    setBatchItems(batchItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
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
                <a href="/prompt/text-prompt" className="hover:text-gray-700">
                  文本提示词示例
                </a>
                <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/prompt/text-prompt")}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回
            </Button>
            <h1 className="text-xl font-medium">批量运行</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              导入CSV
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              导出结果
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" />
              保存批次
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="editor">批量编辑器</TabsTrigger>
            <TabsTrigger value="results">运行结果</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>批量变量</CardTitle>
                      <CardDescription>编辑要批量运行的变量值</CardDescription>
                    </div>
                    <Button size="sm" onClick={addBatchItem}>
                      <Plus className="h-4 w-4 mr-1" />
                      添加行
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>序号</TableHead>
                            <TableHead>question</TableHead>
                            <TableHead>feature4</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead className="w-[100px]">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {batchItems.map((item, index) => (
                            <TableRow key={item.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                <Input
                                  value={item.question}
                                  onChange={(e) => updateBatchItem(item.id, "question", e.target.value)}
                                  placeholder="输入问题"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={item.feature4}
                                  onChange={(e) => updateBatchItem(item.id, "feature4", e.target.value)}
                                  placeholder="输入特性"
                                />
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    item.status === "已完成"
                                      ? "bg-green-100 text-green-600 border-green-200"
                                      : item.status === "运行中"
                                        ? "bg-blue-100 text-blue-600 border-blue-200"
                                        : "bg-gray-100 text-gray-600 border-gray-200"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBatchItem(item.id)}
                                  disabled={isRunning}
                                >
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>批量运行设置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">模型</label>
                      <Select defaultValue="claude-3-haiku">
                        <SelectTrigger>
                          <SelectValue placeholder="选择模型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
                          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                          <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">最大Token数</label>
                        <Input type="number" defaultValue="500" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">温度</label>
                        <Input type="number" step="0.1" defaultValue="0.7" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">运行间隔 (秒)</label>
                      <Input type="number" defaultValue="1" />
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full bg-black hover:bg-gray-800 text-white"
                        onClick={handleRunBatch}
                        disabled={isRunning || batchItems.length === 0}
                      >
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
                            运行批次
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>批次信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">批次大小</span>
                      <span>{batchItems.length} 项</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">已完成</span>
                      <span>{batchItems.filter((item) => item.status === "已完成").length} 项</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">预估成本</span>
                      <span>${(batchItems.length * 0.00017).toFixed(5)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">预估时间</span>
                      <span>{batchItems.length * 5} 秒</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                <h3 className="font-medium">运行结果</h3>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue placeholder="筛选状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有状态</SelectItem>
                      <SelectItem value="completed">已完成</SelectItem>
                      <SelectItem value="running">运行中</SelectItem>
                      <SelectItem value="pending">待运行</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    导出CSV
                  </Button>
                </div>
              </div>

              <div className="divide-y">
                {batchItems.map((item, index) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200"
                        >
                          #{index + 1}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "已完成"
                              ? "bg-green-100 text-green-600 border-green-200"
                              : item.status === "运行中"
                                ? "bg-blue-100 text-blue-600 border-blue-200"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          查看详情
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-sm font-medium mb-1">变量:</div>
                        <div className="text-sm">
                          <div>
                            <span className="text-gray-500">question:</span> {item.question}
                          </div>
                          <div>
                            <span className="text-gray-500">feature4:</span> {item.feature4}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">响应:</div>
                        <div className="text-sm text-gray-600">
                          {item.status === "已完成"
                            ? "Knit 是一个提示词管理工具，允许用户在不同项目中存储、编辑和运行提示词，具有成员访问控制、版本控制和多变量支持等功能。"
                            : item.status === "运行中"
                              ? "正在生成响应..."
                              : "尚未运行"}
                        </div>
                      </div>
                    </div>

                    {item.status === "已完成" && (
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div>字符数: 564</div>
                        <div>Token数: 217</div>
                        <div>耗时: 4.7s</div>
                        <div>成本: $0.00017</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
