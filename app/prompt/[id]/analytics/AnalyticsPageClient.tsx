"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, Download, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPageClient() {
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
            <h1 className="text-xl font-medium">分析统计</h1>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[140px] h-9">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                <SelectValue placeholder="时间范围" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">最近7天</SelectItem>
                <SelectItem value="30days">最近30天</SelectItem>
                <SelectItem value="90days">最近90天</SelectItem>
                <SelectItem value="all">所有时间</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              导出报告
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatCard title="总运行次数" value="42" change="+12%" />
          <StatCard title="平均响应时间" value="4.2秒" change="-0.3秒" positive={true} />
          <StatCard title="总Token消耗" value="9,142" change="+2,134" />
          <StatCard title="总成本" value="$0.0082" change="+$0.0021" />
        </div>

        <Tabs defaultValue="usage">
          <TabsList className="mb-6">
            <TabsTrigger value="usage">使用情况</TabsTrigger>
            <TabsTrigger value="performance">性能分析</TabsTrigger>
            <TabsTrigger value="cost">成本分析</TabsTrigger>
            <TabsTrigger value="comparison">模型对比</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>使用趋势</CardTitle>
                <CardDescription>查看提示词的使用频率和趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full max-w-3xl">
                    <div className="flex items-end justify-between h-[200px] gap-1">
                      {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-purple-500 rounded-t"
                            style={{
                              height: `${Math.max(20, Math.random() * 180)}px`,
                              opacity: 0.6 + index / 100,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span>4月1日</span>
                      <span>4月15日</span>
                      <span>4月30日</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>使用时段分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>上午 (6:00-12:00): 25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>下午 (12:00-18:00): 45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>晚上 (18:00-24:00): 30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>变量使用频率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>question</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>feature4</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>其他变量</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>响应时间趋势</CardTitle>
                <CardDescription>查看提示词的响应时间变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full max-w-3xl">
                    <div className="relative h-[200px]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex items-end justify-between h-full gap-1">
                        {Array.from({ length: 30 }).map((_, index) => {
                          const height = Math.max(20, 100 + Math.sin(index / 3) * 50)
                          return (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div
                                className="w-full bg-blue-500 rounded-t"
                                style={{
                                  height: `${height}px`,
                                  opacity: 0.6 + index / 100,
                                }}
                              ></div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span>4月1日</span>
                      <span>4月15日</span>
                      <span>4月30日</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>模型响应时间对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="text-center w-full max-w-md">
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>claude-3-haiku: 4.2秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>gpt-4o: 5.8秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>gpt-4o-mini: 3.1秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token生成速度</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>claude-3-haiku</span>
                          <span>42 tokens/秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o</span>
                          <span>38 tokens/秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o-mini</span>
                          <span>56 tokens/秒</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cost" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>成本趋势</CardTitle>
                <CardDescription>查看提示词的使用成本变化趋势</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <div className="w-full max-w-3xl">
                    <div className="flex items-end justify-between h-[200px] gap-1">
                      {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-green-500 rounded-t"
                            style={{
                              height: `${Math.max(10, Math.random() * 150)}px`,
                              opacity: 0.6 + index / 100,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                      <span>4月1日</span>
                      <span>4月15日</span>
                      <span>4月30日</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>模型成本对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>claude-3-haiku: $0.0051 (60%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>gpt-4o: $0.0025 (30%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>gpt-4o-mini: $0.0010 (10%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>每次运行平均成本</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>claude-3-haiku</span>
                          <span>$0.00017/次</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o</span>
                          <span>$0.00025/次</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "95%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o-mini</span>
                          <span>$0.00010/次</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>模型性能对比</CardTitle>
                <CardDescription>比较不同模型在此提示词上的表现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">模型</th>
                        <th className="text-left py-3 px-4">平均响应时间</th>
                        <th className="text-left py-3 px-4">平均Token数</th>
                        <th className="text-left py-3 px-4">每次运行成本</th>
                        <th className="text-left py-3 px-4">运行次数</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">claude-3-haiku</td>
                        <td className="py-3 px-4">4.2秒</td>
                        <td className="py-3 px-4">217</td>
                        <td className="py-3 px-4">$0.00017</td>
                        <td className="py-3 px-4">25</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">gpt-4o</td>
                        <td className="py-3 px-4">5.8秒</td>
                        <td className="py-3 px-4">245</td>
                        <td className="py-3 px-4">$0.00025</td>
                        <td className="py-3 px-4">10</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">gpt-4o-mini</td>
                        <td className="py-3 px-4">3.1秒</td>
                        <td className="py-3 px-4">198</td>
                        <td className="py-3 px-4">$0.00010</td>
                        <td className="py-3 px-4">7</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>响应质量评分</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="text-center w-full max-w-md">
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>claude-3-haiku: 8.7/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "87%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>gpt-4o: 9.2/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span>gpt-4o-mini: 7.8/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>性价比分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>claude-3-haiku</span>
                          <span>8.5/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o</span>
                          <span>7.8/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span>gpt-4o-mini</span>
                          <span>9.3/10</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "93%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatCard({ title, value, change, positive = false }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <div className={`text-sm ${positive ? "text-green-600" : "text-blue-600"}`}>{change}</div>
      </CardContent>
    </Card>
  )
}
