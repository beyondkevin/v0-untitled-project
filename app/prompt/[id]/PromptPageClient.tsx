"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Maximize2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CompareDialog from "./components/compare-dialog"

export default function PromptPageClient() {
  const [systemPrompt, setSystemPrompt] = useState(
    `You are an assistant of a service called Knit.

Knit is a prompt managing tool, which has these features:

- store/edit/run user's prompts in different projects
- member access for projects
- full version control
- {feature4}
- support OpenAI/Claude models, will support more models in the future

Respond to user in a helpful manner. Keep it concise and easy to understand.`,
  )

  const [userPrompt, setUserPrompt] = useState("Hi, my question is {question}")
  const [response, setResponse] = useState("")
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isBatchModeOpen, setIsBatchModeOpen] = useState(false)

  // 模拟历史版本数据
  const allVersions = [
    {
      id: "version-1",
      type: "version" as const,
      timestamp: "2023-04-02T06:47:14Z",
      model: "claude-3-haiku",
      maxTokens: 500,
      temperature: 0.7,
      systemPrompt: "You are an assistant of a service called Knit...",
      userPrompt: "Hi, my question is What is Knit?",
      response:
        "Knit is a prompt managing tool that allows users to:\n1. Store, edit, and run their prompts in different projects.\n3. Provide full version control for prompt management.",
    },
    {
      id: "version-2",
      type: "version" as const,
      timestamp: "2023-04-01T15:30:22Z",
      model: "claude-3-haiku",
      maxTokens: 500,
      temperature: 0.7,
      systemPrompt: "You are an assistant of a service called Knit...",
      userPrompt: "Hi, my question is What is Knit?",
      response:
        "Knit is a prompt managing tool that allows users to:\n1. Store, edit, and run their prompts in different projects.\n3. Provide full version control for prompt management.",
    },
  ]

  const handleRun = () => {
    setIsRunning(true)
    setResponse("")

    // Simulate AI response
    setTimeout(() => {
      setResponse(`Knit is a prompt managing tool that allows users to:

1. Store, edit, and run their prompts in different projects.
2. Grant member access to projects.
3. Provide full version control for prompt management.
4. Support the use of multi-variables within prompt text.
5. Currently support OpenAI and Claude models, with plans to support more models in the future.`)
      setIsRunning(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b p-2 flex items-center gap-2">
        <Select defaultValue="claude-3-haiku">
          <SelectTrigger className="w-36 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
            <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 text-xs text-muted-foreground border rounded px-2 py-1">
          <span>500</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground border rounded px-2 py-1">
          <span>0.7</span>
        </div>

        <Button variant="outline" size="sm" className="text-xs h-8">
          View code
        </Button>
      </div>

      <div className="grid grid-cols-3 flex-1">
        {/* System Prompt */}
        <div className="border-r p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">系统提示词</div>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="min-h-[400px] resize-none border-0 p-0 focus-visible:ring-0 text-sm"
          />
        </div>

        {/* User Prompt */}
        <div className="border-r p-4">
          <div className="text-xs font-medium text-muted-foreground mb-2">用户提示词</div>
          <Textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="min-h-[100px] resize-none border-0 p-0 focus-visible:ring-0 text-sm"
          />
        </div>

        {/* Variables */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-muted-foreground">变量</div>
            <div className="text-xs text-blue-600">?</div>
          </div>

          <Button variant="outline" size="sm" className="text-xs mb-4">
            新建分组
          </Button>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <div className="text-xs font-medium">分组 #1</div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>

            <div className="border rounded-md mb-2">
              <div className="flex items-center border-b">
                <div className="w-1/3 p-2 text-xs font-medium border-r">feature4</div>
                <div className="w-2/3 p-2 text-xs">multi-variables in prompt text</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/3 p-2 text-xs font-medium border-r">question</div>
                <div className="w-2/3 p-2 text-xs">What is Knit?</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response Area */}
      <div className="border-t">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>字符数</span>
              <span className="font-medium">508</span>
            </div>
            <div className="flex items-center gap-1">
              <span>令牌数</span>
              <span className="font-medium">286</span>
            </div>
            <div className="flex items-center gap-1">
              <span>耗时</span>
              <span className="font-medium">-</span>
            </div>
            <div className="flex items-center gap-1">
              <span>成本</span>
              <span className="font-medium">$0.00015</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="default"
              size="sm"
              className="bg-black text-white hover:bg-black/90"
              onClick={handleRun}
              disabled={isRunning}
            >
              {isRunning ? "运行中..." : "运行"}
            </Button>
            <Link href="batch">
              <Button variant="outline" size="sm">
                批量运行
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setIsCompareOpen(true)}>
              比较
            </Button>
            <Button variant="outline" size="sm" className="px-2">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="px-2">
              <Clock className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <div className="text-xs font-medium">分组 #1</div>
              <div className="text-xs text-muted-foreground">508 / last</div>
            </div>

            <div className="text-sm whitespace-pre-wrap">{response}</div>
          </div>
        )}
      </div>

      {/* Compare Dialog */}
      <CompareDialog
        open={isCompareOpen}
        onOpenChange={setIsCompareOpen}
        allVersions={allVersions}
        allBatchItems={[]}
      />
    </div>
  )
}
