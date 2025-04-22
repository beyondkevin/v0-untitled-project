"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Settings, Users } from "lucide-react"
import ProjectList from "@/components/project-list"
import MainNavigation from "@/components/main-navigation"
import UserAvatar from "@/components/user-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import CreateProjectModal from "@/components/create-project-modal"
import { useState } from "react"

export default function HomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center text-white font-bold text-xl">
                #
              </div>
              <span className="ml-2 text-xl font-bold">Knit</span>
            </a>
            <MainNavigation />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input className="pl-10 w-[280px]" placeholder="搜索提示词..." />
            </div>
            <UserAvatar />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex">
          <div className="w-64 pr-6">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-gray-500 mb-2">项目</h2>
              <ProjectList />
            </div>
            <Button
              variant="outline"
              className="w-full justify-start"
              size="sm"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> 新建项目
            </Button>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">个人项目</h1>
              <p className="text-gray-500">3 个提示词, 1 位成员</p>
            </div>

            <Tabs defaultValue="prompts" className="mb-6">
              <TabsList>
                <TabsTrigger value="prompts" className="px-4">
                  提示词
                </TabsTrigger>
                <TabsTrigger value="members" className="px-4">
                  成员
                </TabsTrigger>
                <TabsTrigger value="settings" className="px-4">
                  设置
                </TabsTrigger>
              </TabsList>

              <TabsContent value="prompts" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div
                    className="border rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-purple-300 hover:bg-purple-50 transition-colors cursor-pointer h-[180px]"
                    onClick={() => (window.location.href = "/prompt/new")}
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <Plus className="h-5 w-5 text-purple-500" />
                    </div>
                    <span>新建提示词</span>
                  </div>

                  <PromptCard
                    title="图像提示词示例"
                    type="图像生成"
                    model="gpt-4o-mini"
                    lastEdited="22天前"
                    id="image-prompt"
                  />

                  <PromptCard
                    title="文本提示词示例"
                    type="文本生成"
                    model="claude-3-haiku"
                    lastEdited="20天前"
                    id="text-prompt"
                  />

                  <PromptCard
                    title="函数调用提示词示例"
                    type="对话"
                    model="claude-3-haiku"
                    lastEdited="11天前"
                    id="function-prompt"
                  />
                </div>
              </TabsContent>

              <TabsContent value="members" className="mt-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">项目成员</h3>
                    <Button size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      邀请成员
                    </Button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white">
                          J
                        </div>
                        <div>
                          <div className="font-medium">您</div>
                          <div className="text-sm text-gray-500">user@example.com</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">所有者</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="font-medium">项目设置</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">项目名称</label>
                      <Input value="个人" className="max-w-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">项目描述</label>
                      <Input value="我的个人提示词项目" className="max-w-md" />
                    </div>
                    <div className="pt-4">
                      <Button className="bg-black hover:bg-gray-800 text-white">
                        <Settings className="h-4 w-4 mr-2" />
                        保存设置
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {showCreateModal && <CreateProjectModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

function PromptCard({ title, type, model, lastEdited, id }) {
  return (
    <a href={`/prompt/${id}`} className="border rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer block">
      <h3 className="font-medium mb-4">{title}</h3>
      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline" className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200">
          {type}
        </Badge>
        <Badge variant="outline" className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-blue-200">
          {model}
        </Badge>
      </div>
      <div className="text-xs text-gray-500">最后编辑于 {lastEdited}</div>
    </a>
  )
}
