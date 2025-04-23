"use client"

import { useState } from "react"
import { Save, Trash2, Users, Lock, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SettingsPageClient() {
  const [activeTab, setActiveTab] = useState("general")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [promptName, setPromptName] = useState("示例提示词")
  const [promptDescription, setPromptDescription] = useState("这是一个示例提示词，用于展示Knit的功能。")
  const [isPublic, setIsPublic] = useState(false)

  const handleSaveSettings = () => {
    // 在实际应用中，这里会保存设置
    alert("设置已保存")
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
        <h1 className="text-2xl font-bold mb-2">设置</h1>
        <p className="text-sm text-muted-foreground">管理您的提示词设置和访问权限。</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">常规</TabsTrigger>
          <TabsTrigger value="sharing">共享</TabsTrigger>
          <TabsTrigger value="advanced">高级</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>更新您的提示词的基本信息。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">提示词名称</label>
                <Input value={promptName} onChange={(e) => setPromptName(e.target.value)} className="max-w-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">描述</label>
                <Textarea
                  value={promptDescription}
                  onChange={(e) => setPromptDescription(e.target.value)}
                  className="max-w-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">标签</label>
                <Input placeholder="添加标签，用逗号分隔" className="max-w-md" />
                <p className="text-xs text-muted-foreground mt-1">标签可以帮助您更好地组织和查找提示词。</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">默认模型</label>
                <Select defaultValue="claude-3-haiku">
                  <SelectTrigger className="max-w-md">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
                    <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                    <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                保存更改
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>危险区域</CardTitle>
              <CardDescription>这些操作不可撤销，请谨慎操作。</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash2 className="h-4 w-4 mr-2" />
                删除提示词
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sharing">
          <Card>
            <CardHeader>
              <CardTitle>共享设置</CardTitle>
              <CardDescription>管理谁可以访问和编辑您的提示词。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">公开访问</h3>
                  <p className="text-sm text-muted-foreground">允许任何人查看此提示词。</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-2">共享链接</h3>
                <div className="flex items-center gap-2">
                  <Input value="https://knit.ai/prompts/example-123" readOnly className="max-w-md" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard("https://knit.ai/prompts/example-123")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">任何拥有此链接的人都可以查看此提示词。</p>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">协作者</h3>
                  <Button variant="outline" size="sm" onClick={() => setIsShareDialogOpen(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    添加协作者
                  </Button>
                </div>
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">J</div>
                      <div>
                        <p className="font-medium">您</p>
                        <p className="text-xs text-gray-500">you@example.com</p>
                      </div>
                    </div>
                    <Badge>所有者</Badge>
                  </div>
                  <div className="p-3 text-center text-sm text-muted-foreground">还没有其他协作者。</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>配置提示词的高级选项。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">默认温度</label>
                <Input type="number" defaultValue="0.7" min="0" max="1" step="0.1" className="max-w-md" />
                <p className="text-xs text-muted-foreground mt-1">
                  较高的值会使输出更加随机，较低的值会使其更加集中和确定性。
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">默认最大令牌数</label>
                <Input type="number" defaultValue="500" min="1" max="4000" className="max-w-md" />
                <p className="text-xs text-muted-foreground mt-1">限制生成响应的最大令牌数。</p>
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <h3 className="font-medium">启用版本控制</h3>
                  <p className="text-sm text-muted-foreground">跟踪此提示词的所有更改。</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between max-w-md">
                <div>
                  <h3 className="font-medium">启用API访问</h3>
                  <p className="text-sm text-muted-foreground">允许通过API访问此提示词。</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                保存更改
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API密钥</CardTitle>
              <CardDescription>管理用于访问此提示词的API密钥。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input value="sk_prompt_123456789abcdef" type="password" className="max-w-md font-mono" />
                <Button variant="outline" size="icon" onClick={() => copyToClipboard("sk_prompt_123456789abcdef")}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                此密钥允许通过API访问此提示词。请妥善保管，不要分享给他人。
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Lock className="h-4 w-4 mr-2" />
                  重新生成密钥
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>您确定要删除此提示词吗？</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销。这将永久删除您的提示词及其所有数据。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>添加协作者</DialogTitle>
            <DialogDescription>邀请其他人协作编辑此提示词。</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">电子邮件地址</label>
              <Input placeholder="输入电子邮件地址" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">权限</label>
              <Select defaultValue="edit">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">只能查看</SelectItem>
                  <SelectItem value="edit">可以编辑</SelectItem>
                  <SelectItem value="admin">管理员</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              取消
            </Button>
            <Button>发送邀请</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
