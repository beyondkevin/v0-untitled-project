"use client"

import { useState } from "react"
import { Calendar, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

// 模拟数据
const usageData = [
  { date: "2023-04-01", requests: 120, tokens: 24000, cost: 0.48 },
  { date: "2023-04-02", requests: 145, tokens: 29000, cost: 0.58 },
  { date: "2023-04-03", requests: 132, tokens: 26400, cost: 0.53 },
  { date: "2023-04-04", requests: 165, tokens: 33000, cost: 0.66 },
  { date: "2023-04-05", requests: 189, tokens: 37800, cost: 0.76 },
  { date: "2023-04-06", requests: 176, tokens: 35200, cost: 0.7 },
  { date: "2023-04-07", requests: 198, tokens: 39600, cost: 0.79 },
  { date: "2023-04-08", requests: 210, tokens: 42000, cost: 0.84 },
  { date: "2023-04-09", requests: 187, tokens: 37400, cost: 0.75 },
  { date: "2023-04-10", requests: 220, tokens: 44000, cost: 0.88 },
  { date: "2023-04-11", requests: 241, tokens: 48200, cost: 0.96 },
  { date: "2023-04-12", requests: 258, tokens: 51600, cost: 1.03 },
  { date: "2023-04-13", requests: 245, tokens: 49000, cost: 0.98 },
  { date: "2023-04-14", requests: 263, tokens: 52600, cost: 1.05 },
]

const modelUsageData = [
  { name: "GPT-4o", value: 45 },
  { name: "Claude-3-Haiku", value: 30 },
  { name: "GPT-4o-mini", value: 15 },
  { name: "Claude-3-Opus", value: 10 },
]

export default function AnalyticsPageClient() {
  const [dateRange, setDateRange] = useState("14d")
  const [activeMetric, setActiveMetric] = useState("requests")

  const getMetricData = () => {
    switch (activeMetric) {
      case "requests":
        return usageData.map((item) => ({ date: item.date, value: item.requests }))
      case "tokens":
        return usageData.map((item) => ({ date: item.date, value: item.tokens }))
      case "cost":
        return usageData.map((item) => ({ date: item.date, value: item.cost }))
      default:
        return usageData.map((item) => ({ date: item.date, value: item.requests }))
    }
  }

  const getMetricTotal = () => {
    return usageData.reduce((acc, item) => {
      switch (activeMetric) {
        case "requests":
          return acc + item.requests
        case "tokens":
          return acc + item.tokens
        case "cost":
          return acc + item.cost
        default:
          return acc + item.requests
      }
    }, 0)
  }

  const formatMetricValue = (value: number) => {
    switch (activeMetric) {
      case "requests":
        return value.toLocaleString()
      case "tokens":
        return value.toLocaleString()
      case "cost":
        return `$${value.toFixed(2)}`
      default:
        return value.toLocaleString()
    }
  }

  const getMetricLabel = () => {
    switch (activeMetric) {
      case "requests":
        return "请求数"
      case "tokens":
        return "令牌数"
      case "cost":
        return "成本"
      default:
        return "请求数"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">分析</h1>
        <p className="text-sm text-muted-foreground">查看您的提示词使用情况和性能指标。</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="usage" className="w-full">
          <TabsList>
            <TabsTrigger value="usage">使用情况</TabsTrigger>
            <TabsTrigger value="performance">性能</TabsTrigger>
            <TabsTrigger value="models">模型</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="border-0 p-0 h-auto w-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">过去 7 天</SelectItem>
                <SelectItem value="14d">过去 14 天</SelectItem>
                <SelectItem value="30d">过去 30 天</SelectItem>
                <SelectItem value="90d">过去 90 天</SelectItem>
              </SelectContent>
            </Select>
          </Button>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          className={activeMetric === "requests" ? "border-2 border-black" : ""}
          onClick={() => setActiveMetric("requests")}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">总请求数</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {usageData.reduce((acc, item) => acc + item.requests, 0).toLocaleString()}
            </div>
            <CardDescription>
              过去 {dateRange === "7d" ? "7" : dateRange === "14d" ? "14" : dateRange === "30d" ? "30" : "90"} 天
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className={activeMetric === "tokens" ? "border-2 border-black" : ""}
          onClick={() => setActiveMetric("tokens")}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">总令牌数</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {usageData.reduce((acc, item) => acc + item.tokens, 0).toLocaleString()}
            </div>
            <CardDescription>
              过去 {dateRange === "7d" ? "7" : dateRange === "14d" ? "14" : dateRange === "30d" ? "30" : "90"} 天
            </CardDescription>
          </CardContent>
        </Card>
        <Card
          className={activeMetric === "cost" ? "border-2 border-black" : ""}
          onClick={() => setActiveMetric("cost")}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-sm font-medium">总成本</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">${usageData.reduce((acc, item) => acc + item.cost, 0).toFixed(2)}</div>
            <CardDescription>
              过去 {dateRange === "7d" ? "7" : dateRange === "14d" ? "14" : dateRange === "30d" ? "30" : "90"} 天
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="p-4">
          <CardTitle>{getMetricLabel()}趋势</CardTitle>
          <CardDescription>
            过去 {dateRange === "7d" ? "7" : dateRange === "14d" ? "14" : dateRange === "30d" ? "30" : "90"} 天的
            {getMetricLabel()}趋势
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ChartContainer
            config={{
              value: {
                label: getMetricLabel(),
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getMetricData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="var(--color-value)" name={getMetricLabel()} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-4">
            <CardTitle>模型使用情况</CardTitle>
            <CardDescription>按模型类型划分的使用情况</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                value: {
                  label: "使用百分比",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value" fill="var(--color-value)" name="使用百分比" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle>使用情况摘要</CardTitle>
            <CardDescription>
              过去 {dateRange === "7d" ? "7" : dateRange === "14d" ? "14" : dateRange === "30d" ? "30" : "90"}{" "}
              天的使用情况摘要
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">平均每日{getMetricLabel()}</span>
                  <span className="font-medium">{formatMetricValue(getMetricTotal() / usageData.length)}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">最高单日{getMetricLabel()}</span>
                  <span className="font-medium">
                    {formatMetricValue(
                      Math.max(
                        ...usageData.map((item) =>
                          activeMetric === "requests"
                            ? item.requests
                            : activeMetric === "tokens"
                              ? item.tokens
                              : item.cost,
                        ),
                      ),
                    )}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">最低单日{getMetricLabel()}</span>
                  <span className="font-medium">
                    {formatMetricValue(
                      Math.min(
                        ...usageData.map((item) =>
                          activeMetric === "requests"
                            ? item.requests
                            : activeMetric === "tokens"
                              ? item.tokens
                              : item.cost,
                        ),
                      ),
                    )}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">增长率</span>
                  <span className="font-medium text-green-600">+24.5%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
