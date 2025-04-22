"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Download, Copy } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompareModal({ onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>对比版本</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex items-center justify-end gap-2 mb-4">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            复制差异
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            导出对比结果
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">上一版本</h3>
              <Select defaultValue="04/22 16:11:00">
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="选择版本" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="04/22 16:11:00">04/22 16:11:00</SelectItem>
                  <SelectItem value="04/22 16:10:00">04/22 16:10:00</SelectItem>
                  <SelectItem value="04/22 16:09:00">04/22 16:09:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge>claude-3-haiku</Badge>
              <Badge>500</Badge>
              <Badge>0.7</Badge>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium">当前版本</h3>
              <Select defaultValue="04/22 16:11:08">
                <SelectTrigger className="w-[180px] h-8 text-xs">
                  <SelectValue placeholder="选择版本" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="04/22 16:11:08">04/22 16:11:08</SelectItem>
                  <SelectItem value="04/22 16:11:00">04/22 16:11:00</SelectItem>
                  <SelectItem value="04/22 16:10:00">04/22 16:10:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge>claude-3-haiku</Badge>
              <Badge>500</Badge>
              <Badge>0.7</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="system">
          <TabsList className="mb-4">
            <TabsTrigger value="system">系统提示词</TabsTrigger>
            <TabsTrigger value="user">用户提示词</TabsTrigger>
            <TabsTrigger value="variables">变量</TabsTrigger>
          </TabsList>

          <TabsContent value="system">
            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <div className="bg-red-50 p-3 border-b">
                <div className="text-sm text-red-700 mb-1">- [系统提示词]</div>
                <div className="text-sm text-red-700 mb-1">- 你是一个名为 Knit 的服务助手。</div>
                <div className="text-sm text-red-700 mb-1">-</div>
                <div className="text-sm text-red-700 mb-1">- Knit 是一个提示词管理工具，具有以下功能：</div>
                <div className="text-sm text-red-700 mb-1">-</div>
                <div className="text-sm text-red-700 mb-1">- - 在不同项目中存储/编辑/运行用户的提示词</div>
                <div className="text-sm text-red-700 mb-1">- - 项目成员访问控制</div>
                <div className="text-sm text-red-700 mb-1">- - 完整版本控制</div>
                <div className="text-sm text-red-700 mb-1">- - 提示词中的多变量支持</div>
                <div className="text-sm text-red-700 mb-1">- - 支持 OpenAI/Claude 模型，未来将支持更多模型</div>
                <div className="text-sm text-red-700 mb-1">-</div>
                <div className="text-sm text-red-700 mb-1">- 请以有帮助的方式回应用户。保持简洁明了。</div>
              </div>

              <div className="bg-green-50 p-3">
                <div className="text-sm text-green-700 mb-1">+ [系统提示词]</div>
                <div className="text-sm text-green-700 mb-1">+ 你是一个名为 Knit 的服务助手。</div>
                <div className="text-sm text-green-700 mb-1">+</div>
                <div className="text-sm text-green-700 mb-1">+ Knit 是一个提示词管理工具，具有以下功能：</div>
                <div className="text-sm text-green-700 mb-1">+</div>
                <div className="text-sm text-green-700 mb-1">+ - 在不同项目中存储/编辑/运行用户的提示词</div>
                <div className="text-sm text-green-700 mb-1">+ - 项目成员访问控制</div>
                <div className="text-sm text-green-700 mb-1">+ - 完整版本控制</div>
                <div className="text-sm text-green-700 mb-1">+ - 提示词中的多变量支持</div>
                <div className="text-sm text-green-700 mb-1">+ - 支持 OpenAI/Claude 模型，未来将支持更多模型</div>
                <div className="text-sm text-green-700 mb-1">+ - 高级分析和统计功能</div>
                <div className="text-sm text-green-700 mb-1">+</div>
                <div className="text-sm text-green-700 mb-1">+ 请以有帮助的方式回应用户。保持简洁明了。</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user">
            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <div className="bg-gray-50 p-3 text-center text-gray-500">用户提示词没有变化</div>
            </div>
          </TabsContent>

          <TabsContent value="variables">
            <div className="border rounded-md max-h-[400px] overflow-y-auto">
              <div className="bg-red-50 p-3 border-b">
                <div className="text-sm text-red-700 mb-1">- question: 什么是 Knit?</div>
              </div>

              <div className="bg-green-50 p-3">
                <div className="text-sm text-green-700 mb-1">+ question: 什么是 Knit？</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500 mt-4">对比当前版本与不同版本以更好地了解变更。</div>
      </DialogContent>
    </Dialog>
  )
}

function Badge({ children }) {
  return <div className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">{children}</div>
}
