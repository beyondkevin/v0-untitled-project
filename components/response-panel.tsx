import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Edit } from "lucide-react"

export default function ResponsePanel({ responseGenerated, response }) {
  return (
    <div className="border rounded-md">
      <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">组 #1</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        {responseGenerated ? (
          <div className="text-sm">
            <p className="text-gray-500 text-xs mb-2">564c, 114t</p>
            <div className="whitespace-pre-line">
              {response?.text ||
                "Knit 是一个提示词管理工具，允许用户：\n\n1. 在不同项目中存储、编辑和运行他们的提示词。\n2. 控制项目成员的访问权限。\n3. 使用完整的版本控制功能。\n4. 在提示词中使用多变量支持。\n5. 目前支持 OpenAI 和 Claude 模型，未来将支持更多模型。"}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">尚无响应。</div>
        )}
      </div>
    </div>
  )
}
