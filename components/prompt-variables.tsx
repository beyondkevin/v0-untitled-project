"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, Info, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PromptVariables({ readOnly = false }) {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "组 #1",
      isOpen: true,
      variables: [
        { id: 1, name: "feature4", value: "提示词中的多变量支持" },
        { id: 2, name: "question", value: "什么是 Knit？" },
      ],
    },
  ])

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        id: Date.now(),
        name: `组 #${groups.length + 1}`,
        isOpen: true,
        variables: [],
      },
    ])
  }

  const toggleGroup = (groupId) => {
    setGroups(groups.map((group) => (group.id === groupId ? { ...group, isOpen: !group.isOpen } : group)))
  }

  const addVariable = (groupId) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variables: [...group.variables, { id: Date.now(), name: `变量${group.variables.length + 1}`, value: "" }],
            }
          : group,
      ),
    )
  }

  const updateVariableName = (groupId, variableId, name) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variables: group.variables.map((variable) =>
                variable.id === variableId ? { ...variable, name } : variable,
              ),
            }
          : group,
      ),
    )
  }

  const updateVariableValue = (groupId, variableId, value) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variables: group.variables.map((variable) =>
                variable.id === variableId ? { ...variable, value } : variable,
              ),
            }
          : group,
      ),
    )
  }

  const removeVariable = (groupId, variableId) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              variables: group.variables.filter((variable) => variable.id !== variableId),
            }
          : group,
      ),
    )
  }

  return (
    <div className="border rounded-md">
      <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          变量
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 ml-1 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">变量可以在提示词中使用 {"{变量名}"} 的格式引用，运行时会自动替换为变量值。</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h3>
        {!readOnly && (
          <Button variant="ghost" size="sm" className="h-7" onClick={addGroup}>
            <Plus className="h-4 w-4 mr-1" />
            新建组
          </Button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="mb-4">
            <div
              className="flex items-center justify-between bg-purple-50 p-2 rounded-md cursor-pointer"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-300 mr-2"></div>
                <span className="text-sm font-medium">{group.name}</span>
              </div>
              <button>{group.isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}</button>
            </div>

            {group.isOpen && (
              <div className="mt-3 space-y-3">
                {group.variables.map((variable) => (
                  <div key={variable.id} className="border rounded-md">
                    <div className="bg-gray-50 px-3 py-1.5 border-b flex items-center justify-between">
                      <div className="px-2 py-0.5 bg-gray-200 rounded text-xs text-gray-700">
                        {readOnly ? (
                          variable.name
                        ) : (
                          <Input
                            value={variable.name}
                            onChange={(e) => updateVariableName(group.id, variable.id, e.target.value)}
                            className="h-5 py-0 px-1 w-auto min-w-[80px] bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        )}
                      </div>
                      {!readOnly && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0"
                          onClick={() => removeVariable(group.id, variable.id)}
                        >
                          <Trash className="h-3 w-3 text-red-500" />
                        </Button>
                      )}
                    </div>
                    <div className="p-2">
                      <div className="relative">
                        <Input
                          value={variable.value}
                          onChange={(e) => updateVariableValue(group.id, variable.id, e.target.value)}
                          className="pr-12"
                          readOnly={readOnly}
                        />
                        {!readOnly && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button className="text-gray-400 hover:text-gray-600">
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {!readOnly && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-gray-500"
                    onClick={() => addVariable(group.id)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    添加变量
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
