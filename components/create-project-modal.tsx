"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CreateProjectModal({ onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新项目</DialogTitle>
          <DialogDescription>创建一个新的项目来组织和管理您的提示词。</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              项目名称
            </label>
            <Input id="name" placeholder="输入项目名称" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              项目描述 (可选)
            </label>
            <Textarea id="description" placeholder="简要描述项目的用途" className="resize-none" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button className="bg-black hover:bg-gray-800 text-white">创建项目</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
