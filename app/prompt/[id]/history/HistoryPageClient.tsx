"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronLeft, Clock, Copy, Eye, Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HistoryPageClient() {
  const [viewMode, setViewMode] = useState("list")
  const [selectedItem, setSelectedItem] = useState(null)

  const historyItems = [
    {
      id: 1,
      date: "2023-04-22 16:11:08",
      model: "claude-3-haiku",
      tokens: 217,
      cost: "$0.00017",
      response:
        "Knit 是一个提示词管理工具，允许用户：\n\n1. 在不同项目中存储、编辑和运行他们的提示词。\n2. 控制项目成员的访问权限。\n3. 使用完整的版本控制功能。\n4. 在提示词中使用多变量支持。\n5. 目前支持 OpenAI 和 Claude 模型，未来将支持更多模型。",
      variables: {
        question: "什么是 Knit？",
      },
    },
    {
      id: 2,
      date: "2023-04-22 16:11:00",
      model: "claude-3-haiku",
      tokens: 215,
      cost: "$0.00016",
      response:
        "Knit 是一个提示词管理工具，具有以下功能：\n\n- 存储、编辑和运行用户的提示词\n- 项目成员访问控制\n- 完整版本控制\n- 提示词中的多变量支持\n- 支持 OpenAI/Claude 模型",
      variables: {
        question: "什么是 Knit?",
      },
    },
    {
      id: 3,
      date: "2023-04-22 16:10:30",
      model: "gpt-4o",
      tokens: 245,
      cost: "$0.00025",
      response:
        "Knit 是一个强大的提示词管理工具，它允许用户在不同项目中组织和运行提示词。它支持团队协作，提供成员访问控制，并具有完整的版本控制系统。Knit 的一个特色功能是支持在提示词中使用多变量，使提示词更加灵活。目前，Knit 支持 OpenAI 和 Claude 等主流 AI 模型，并计划在未来支持更多模型。",
      variables: {
        question: "Knit 是什么？",
      },
    },
    {
      id: 4,
      date: "2023-04-22 16:09:45",
      model: "gpt-4o-mini",
      tokens: 198,
      cost: "$0.00010",
      response:
        "Knit 是一个提示词管理工具，可以帮助用户存储、编辑和运行提示词。它支持多个项目，有成员访问控制，版本控制，以及提示词中的多变量支持。目前支持 OpenAI 和 Claude 模型。",
      variables: {
        question: "简单介绍一下 Knit",
      },
    },
    {
      id: 5,
      date: "2023-04-22 16:08:20",
      model: "claude-3-haiku",
      tokens: 220,
      cost: "$0.00018",
      response:
        "Knit 是一个提示词管理平台，它允许用户：\n\n1. 在不同项目中组织提示词\n2. 控制团队成员的访问权限\n3. 跟踪提示词的版本历史\n4. 在提示词中使用变量\n5. 使用 OpenAI 和 Claude 等 AI 模型\n\n它是一个专为提示词工程设计的协作工具。",
      variables: {
        question: "Knit 的主要功能是什么？",
      },
    },
  ]

  const viewItem = (item) => {
    setSelectedItem(item)
    setViewMode("detail")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white">
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
            <h1 className="text-xl font-medium">运行历史</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 w-[200px] h-9" placeholder="搜索历史..." />
            </div>
            <Select defaultValue="7days">
              <SelectTrigger className="w-[140px] h-9">
                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">今天</SelectItem>
                <SelectItem value="7days">最近7天</SelectItem>
                <SelectItem value="30days">最近30天</SelectItem>
                <SelectItem value="all">所有时间</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              筛选
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              导出
            </Button>
          </div>
        </div>

        <Tabs value={viewMode} onValueChange={setViewMode}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="list">列表视图</TabsTrigger>
              <TabsTrigger value="detail">详细视图</TabsTrigger>
              <TabsTrigger value="stats">统计分析</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期时间</TableHead>
                    <TableHead>模型</TableHead>
                    <TableHead>变量</TableHead>
                    <TableHead>Token数</TableHead>
                    <TableHead>成本</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-blue-200"
                        >
                          {item.model}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">
                          {Object.entries(item.variables).map(([key, value]) => (
                            <span key={key} className="text-xs mr-2">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{item.tokens}</TableCell>
                      <TableCell>{item.cost}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => viewItem(item)}>
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            复制
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="detail">
            {selectedItem ? (
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">响应内容</CardTitle>
                      <CardDescription>
                        运行于 {selectedItem.date} · {selectedItem.model}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-line border p-4 rounded-md bg-gray-50 min-h-[200px]">
                        {selectedItem.response}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">提示词内容</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">系统提示词</h3>
                          <div className="border p-4 rounded-md bg-gray-50 min-h-[150px] text-sm">
                            你是一个名为 Knit 的服务助手。 Knit 是一个提示词管理工具，具有以下功能： -
                            在不同项目中存储/编辑/运行用户的提示词 - 项目成员访问控制 - 完整版本控制 -
                            提示词中的多变量支持 - 支持 OpenAI/Claude 模型，未来将支持更多模型
                            请以有帮助的方式回应用户。保持简洁明了。
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">用户提示词</h3>
                          <div className="border p-4 rounded-md bg-gray-50 min-h-[150px] text-sm">
                            你好，我的问题是 {selectedItem.variables.question}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">运行详情</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">运行时间</span>
                        <span>{selectedItem.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">模型</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-blue-200"
                        >
                          {selectedItem.model}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Token数</span>
                        <span>{selectedItem.tokens}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">成本</span>
                        <span>{selectedItem.cost}</span>
                      </div>
                      <div className="pt-4">
                        <h3 className="text-sm font-medium mb-2">变量</h3>
                        <div className="border rounded-md p-3 bg-gray-50">
                          {Object.entries(selectedItem.variables).map(([key, value]) => (
                            <div key={key} className="flex justify-between mb-2 last:mb-0">
                              <span className="text-gray-500">{key}</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>请从列表中选择一个历史记录查看详情</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>模型使用统计</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>claude-3-haiku: 60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>gpt-4o: 20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>gpt-4o-mini: 20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>成本分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">$0.00086</div>
                      <div className="text-gray-500 mb-6">总成本</div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xl font-medium">$0.00051</div>
                          <div className="text-sm text-gray-500">Claude</div>
                        </div>
                        <div>
                          <div className="text-xl font-medium">$0.00025</div>
                          <div className="text-sm text-gray-500">GPT-4o</div>
                        </div>
                        <div>
                          <div className="text-xl font-medium">$0.00010</div>
                          <div className="text-sm text-gray-500">GPT-4o-mini</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>响应时间分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center">
                  <div className="w-full max-w-2xl">
                    <div className="flex items-end justify-between h-[150px] gap-8">
                      {historyItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-purple-500 rounded-t"
                            style={{
                              height: `${(Number.parseFloat(item.tokens) / 250) * 100}px`,
                              opacity: 0.6 + index * 0.1,
                            }}
                          ></div>
                          <div className="text-xs mt-2 text-gray-500">{item.date.split(" ")[1]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
