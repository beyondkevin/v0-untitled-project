"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronLeft, Save, Trash, Plus, Copy, Download, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isEditing, setIsEditing] = useState(false)

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
            <h1 className="text-xl font-medium">提示词设置</h1>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  取消
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  保存
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  编辑
                </Button>
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
              </>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">基本设置</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
            <TabsTrigger value="variables">变量设置</TabsTrigger>
            <TabsTrigger value="versions">版本历史</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <TabsContent value="general" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                    <CardDescription>修改提示词的基本信息和类型</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="block mb-2">
                        提示词名称
                      </Label>
                      <Input id="name" value="文本提示词示例" readOnly={!isEditing} />
                    </div>

                    <div>
                      <Label htmlFor="description" className="block mb-2">
                        描述
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="描述这个提示词的用途..."
                        className="min-h-[100px]"
                        value="这是一个基础的文本生成提示词示例，用于演示Knit平台的功能。"
                        readOnly={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="type" className="block mb-2">
                        提示词类型
                      </Label>
                      <Select defaultValue="text" disabled={!isEditing}>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="选择类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">文本生成</SelectItem>
                          <SelectItem value="image">图像生成</SelectItem>
                          <SelectItem value="conversation">对话</SelectItem>
                          <SelectItem value="function">函数调用</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>默认模型设置</CardTitle>
                    <CardDescription>设置默认使用的模型和参数</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="model" className="block mb-2">
                        默认模型
                      </Label>
                      <Select defaultValue="claude-3-haiku" disabled={!isEditing}>
                        <SelectTrigger id="model">
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
                        <Label htmlFor="max_tokens" className="block mb-2">
                          最大Token数
                        </Label>
                        <Input id="max_tokens" type="number" value="500" readOnly={!isEditing} />
                      </div>

                      <div>
                        <Label htmlFor="temperature" className="block mb-2">
                          温度
                        </Label>
                        <Input id="temperature" type="number" step="0.1" value="0.7" readOnly={!isEditing} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>高级选项</CardTitle>
                    <CardDescription>配置提示词的高级功能和行为</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">自动保存运行结果</Label>
                        <p className="text-sm text-gray-500">每次运行后自动保存结果到历史记录</p>
                      </div>
                      <Switch defaultChecked disabled={!isEditing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">启用版本控制</Label>
                        <p className="text-sm text-gray-500">跟踪提示词的所有更改</p>
                      </div>
                      <Switch defaultChecked disabled={!isEditing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">允许共享</Label>
                        <p className="text-sm text-gray-500">允许其他成员查看和使用此提示词</p>
                      </div>
                      <Switch defaultChecked disabled={!isEditing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">启用批量运行</Label>
                        <p className="text-sm text-gray-500">允许使用多组变量批量运行提示词</p>
                      </div>
                      <Switch disabled={!isEditing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">启用API访问</Label>
                        <p className="text-sm text-gray-500">允许通过API调用此提示词</p>
                      </div>
                      <Switch disabled={!isEditing} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>提示词模板</CardTitle>
                    <CardDescription>将此提示词保存为模板以便重复使用</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">保存为模板</Label>
                        <p className="text-sm text-gray-500">将此提示词保存为可重用的模板</p>
                      </div>
                      <Switch disabled={!isEditing} />
                    </div>

                    <div>
                      <Label htmlFor="template_name" className="block mb-2">
                        模板名称
                      </Label>
                      <Input id="template_name" placeholder="输入模板名称" disabled={!isEditing} />
                    </div>

                    <div>
                      <Label htmlFor="template_category" className="block mb-2">
                        模板分类
                      </Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger id="template_category">
                          <SelectValue placeholder="选择分类" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">通用</SelectItem>
                          <SelectItem value="writing">写作</SelectItem>
                          <SelectItem value="coding">编程</SelectItem>
                          <SelectItem value="creative">创意</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variables" className="space-y-6 mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>变量组</CardTitle>
                      <CardDescription>管理提示词中使用的变量组和变量</CardDescription>
                    </div>
                    {isEditing && (
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        添加变量组
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                          {isEditing ? (
                            <Input className="w-[200px] h-8" value="组 #1" />
                          ) : (
                            <span className="font-medium">组 #1</span>
                          )}
                        </div>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 items-center">
                          {isEditing ? (
                            <>
                              <Input placeholder="变量名" value="feature4" />
                              <div className="flex items-center gap-2">
                                <Input placeholder="变量值" value="提示词中的多变量支持" />
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="font-medium">feature4</div>
                              <div>提示词中的多变量支持</div>
                            </>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-center">
                          {isEditing ? (
                            <>
                              <Input placeholder="变量名" value="question" />
                              <div className="flex items-center gap-2">
                                <Input placeholder="变量值" value="什么是 Knit？" />
                                <Button variant="ghost" size="icon">
                                  <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="font-medium">question</div>
                              <div>什么是 Knit？</div>
                            </>
                          )}
                        </div>

                        {isEditing && (
                          <Button variant="outline" size="sm" className="w-full">
                            <Plus className="h-4 w-4 mr-1" />
                            添加变量
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>批量变量</CardTitle>
                    <CardDescription>导入或创建批量变量用于批量运行提示词</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">启用批量变量</Label>
                        <p className="text-sm text-gray-500">使用CSV或JSON导入多组变量进行批量运行</p>
                      </div>
                      <Switch disabled={!isEditing} />
                    </div>

                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          导入CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          导入JSON
                        </Button>
                        <Button variant="outline" size="sm">
                          创建批量变量
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="versions" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>版本历史</CardTitle>
                    <CardDescription>查看和管理提示词的历史版本</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                        <h3 className="font-medium">版本列表</h3>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          导出历史
                        </Button>
                      </div>
                      <div className="divide-y">
                        {[
                          { id: 1, version: "v1.3", date: "2023-04-22 16:11:08", author: "您" },
                          { id: 2, version: "v1.2", date: "2023-04-22 16:10:30", author: "您" },
                          { id: 3, version: "v1.1", date: "2023-04-22 16:09:45", author: "您" },
                          { id: 4, version: "v1.0", date: "2023-04-22 16:08:20", author: "您" },
                        ].map((version) => (
                          <div key={version.id} className="p-4 flex items-center justify-between">
                            <div>
                              <div className="font-medium">{version.version}</div>
                              <div className="text-sm text-gray-500">
                                {version.date} · {version.author}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                查看
                              </Button>
                              <Button variant="outline" size="sm">
                                恢复
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>版本对比</CardTitle>
                    <CardDescription>对比不同版本之间的变化</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block mb-2">基准版本</Label>
                        <Select defaultValue="v1.3">
                          <SelectTrigger>
                            <SelectValue placeholder="选择版本" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v1.3">v1.3 (当前版本)</SelectItem>
                            <SelectItem value="v1.2">v1.2</SelectItem>
                            <SelectItem value="v1.1">v1.1</SelectItem>
                            <SelectItem value="v1.0">v1.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="block mb-2">对比版本</Label>
                        <Select defaultValue="v1.2">
                          <SelectTrigger>
                            <SelectValue placeholder="选择版本" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v1.3">v1.3 (当前版本)</SelectItem>
                            <SelectItem value="v1.2">v1.2</SelectItem>
                            <SelectItem value="v1.1">v1.1</SelectItem>
                            <SelectItem value="v1.0">v1.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">对比选中版本</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>使用统计</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">创建时间</span>
                    <span>2023-04-01</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">最后修改</span>
                    <span>2023-04-22</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">运行次数</span>
                    <span>42</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">平均响应时间</span>
                    <span>4.2秒</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">总成本</span>
                    <span>$0.0082</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>访问权限</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">可见性</span>
                    <Select defaultValue="private" disabled={!isEditing}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="选择可见性" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">仅自己</SelectItem>
                        <SelectItem value="team">团队成员</SelectItem>
                        <SelectItem value="public">公开</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">编辑权限</span>
                    <Select defaultValue="owner" disabled={!isEditing}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="选择权限" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">仅创建者</SelectItem>
                        <SelectItem value="editors">编辑者</SelectItem>
                        <SelectItem value="all">所有成员</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API访问</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">API状态</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-600">
                      未启用
                    </Badge>
                  </div>

                  {isEditing && (
                    <Button variant="outline" className="w-full">
                      启用API访问
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>危险操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash className="h-4 w-4 mr-1" />
                    删除提示词
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
