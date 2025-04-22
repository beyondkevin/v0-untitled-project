"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewPromptPage() {
  const [promptType, setPromptType] = useState("text")

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
              <span>个人</span>
              <span>/</span>
              <span>新建提示词</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回
            </Button>
            <h1 className="text-xl font-medium">创建新提示词</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>提示词信息</CardTitle>
              <CardDescription>填写基本信息并选择提示词类型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">提示词名称</label>
                <Input placeholder="输入提示词名称" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">描述 (可选)</label>
                <Textarea placeholder="简要描述提示词的用途" className="resize-none min-h-[100px]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">提示词类型</label>
                <Select value={promptType} onValueChange={setPromptType}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择提示词类型" />
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

            <CardHeader className="border-t pt-6">
              <CardTitle>模型设置</CardTitle>
              <CardDescription>选择默认模型和参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">默认模型</label>
                <Select defaultValue="claude-3-haiku">
                  <SelectTrigger>
                    <SelectValue placeholder="选择默认模型" />
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
            </CardContent>

            <CardHeader className="border-t pt-6">
              <CardTitle>提示词内容</CardTitle>
              <CardDescription>编写系统提示词和用户提示词</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="system" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="system">系统提示词</TabsTrigger>
                  <TabsTrigger value="user">用户提示词</TabsTrigger>
                </TabsList>
                <TabsContent value="system">
                  <Textarea placeholder="输入系统提示词..." className="min-h-[200px] resize-none" />
                </TabsContent>
                <TabsContent value="user">
                  <Textarea placeholder="输入用户提示词..." className="min-h-[200px] resize-none" />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 border-t pt-6">
              <Button variant="outline" onClick={() => window.history.back()}>
                取消
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Save className="h-4 w-4 mr-2" />
                创建提示词
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
